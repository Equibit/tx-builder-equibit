const bitcoin = require('bitcoinjs-lib')
const eqbNetworks = require('./networks-equibit')
const bs58check = require('bs58check')
const { createPubKeyHash } = require('tx-builder/src/utils')

/**
 * bitcoin-js lib works with a strict one-byte size version prefix to be used by base58check encoding of bitcoin public key hash;
 * however, Equibit and other protocols may have a variable-length component structure (such as variable version prefix).
 * getEquibitAddress does the following:
 *  - takes hash160 of (version prefix based on network input + public key input)
 *  - passes the result to base58Check encoding
 * @param {Buffer} publicKey public key provided as buffer of hex values
 * @param {Object} options options containing parameters such as type of hashing SHA algorithm used to hash publioc key
 * or network configuration such as pubKeyHash prefixes
 * @return {String} base58Check encoded address
 *
 * ```
 *  const options = {
 *   sha : SHA_3 // (SHA256 | SHA3_256),
 *   network:  {  // object containing all network objects
 *      type_of_netwpork: { // mainnet, testnet, equibit, bitcoin, etc.
 *      messagePrefix: ..., // fields/values are optional
 *      bech32: ...,
 *      bip32: {
 *        public: ...,
 *        private: ...
 *      },
 *      pubKeyHash: 0x035e5d, // pubKeyHash field/value need to be present as it is used by getEquibitAddress
 *      scriptHash: ...,
 *      wif: ...
 *    },
 *    { ... } // addtion network objects
 *   }
 *  }
 * ```
 */

// getEquibitAddress :: (Buffer, Object) -> String
function getEquibitAddress (publicKey, options) {
  const network = (options && options.network) || eqbNetworks.testnet
  let versionHex = convertDecToHexStr(network.pubKeyHash)
  let versionBufferHex = Buffer.from(versionHex, 'hex')
  let hashBufferHex = createPubKeyHash(options)(publicKey)
  let payload = Buffer.concat([versionBufferHex, hashBufferHex])
  return bs58check.encode(payload)
}

// convertDecToHexStr :: Number -> String
function convertDecToHexStr (inputDec) {
  let hexStr = (inputDec).toString(16)
  if (hexStr.length % 2 !== 0) {
    hexStr = '0' + hexStr
  }
  return hexStr
}

/**
* similar to tx-builder voutScript - removed stric typeforce checking on network and address format.
* Also, use custom base58Check decoding to handle variable network properties such as version prefixes.
* @param {Object} options for now used to wrap network configuration object
* @param {addr} String encoded address in tx vout
* @return {Buffer} provides the locking script hash based on vout address
*
*/
// voutScriptEqb :: Options -> Address -> ScriptHex
const voutScriptEqb = ({network}) => addr => {
  /* typeforce(
    typeforce.maybe(typeforce.oneOf(typeforce.value('TESTNET'), typeforce.value('MAINNET'), types.Network)),
    network
  ) */
  // typeforce(types.Address, addr)
  network = (!network || network === 'TESTNET')
    ? eqbNetworks.testnet                                        // <<< default
    : (network === 'MAINNET' ? eqbNetworks.equibit : network)
  // return baddress.toOutputScript(addr, networkObj)
  return toOutputScript(addr, network)
}

/**
 * Given address and network configuration, decode the address to get hash and return a hash of the output script.
 * TODO: decoding bech32 address is only support for Bitcoin addresses, in future any network can be used.
 * @param {String} address encoded address
 * @param {Object} network network configuration
 * @throws {Error} if decoded address does not match any known format
 */
// toOutputScript :: (String, Object) -> Buffer
function toOutputScript (address, network) {
  network = network || eqbNetworks.testnet

  let decode
  try {
    decode = fromBase58Check(address, network)
  } catch (e) {}

  if (decode) {
    if (decode.version === network.pubKeyHash) return bitcoin.payments.p2pkh({ hash: decode.hash }).output
    if (decode.version === network.scriptHash) return bitcoin.payments.p2sh({ hash: decode.hash }).output
  } else {
    try {
      decode = bitcoin.address.fromBech32(address) // TODO: only supports Bitcoin networks for now
    } catch (e) {}

    if (decode) {
      if (decode.prefix !== network.bech32) throw new Error(address + ' has an invalid prefix')
      if (decode.version === 0) {
        if (decode.data.length === 20) return bitcoin.payments.p2wpkh({ hash: decode.data }).output
        if (decode.data.length === 32) return bitcoin.payments.p2wsh({ hash: decode.data }).output
      }
    }
  }

  throw new Error(address + ' has no matching Script')
}

/**
 * Decodes a base58check address String to the corresponding payload, checks input + version length (as per network configuration) and returns the Object containing verison and hash values.
 * Note: input to base58CheckEncoding here only includes hash160 of public key or script which is 20 bytes. Private key input (WIF/WIF Compressed) are not handled by this function (Maybe a TODO)
 * @param {String} address to bedecoded
 */
// fromBase58Check :: string -> Object
function fromBase58Check (address, network) {
  const base58CheckInputLength = 20 // see note in description
  const versionPrefixLength = convertDecToHexStr(network.pubKeyHash).length / 2  // version prefix byte length
  const expectedPayloadLength = base58CheckInputLength + versionPrefixLength
  const payload = bs58check.decode(address)

  // TODO: 4.0.0, move to "toOutputScript"
  if (payload.length < expectedPayloadLength) throw new TypeError(address + ' is too short')
  if (payload.length > expectedPayloadLength) throw new TypeError(address + ' is too long')

  // const version = payload.readUInt8(0)
  const version = payload.readUIntBE(0, versionPrefixLength)
  const hash = payload.slice(versionPrefixLength)

  return { version: version, hash: hash }
}

module.exports = {
  getEquibitAddress: getEquibitAddress,
  voutScriptEqb: voutScriptEqb
}
