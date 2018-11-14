const bitcoin = require('bitcoinjs-lib')
const eqbNetworks = require('./networks-equibit')
const bs58check = require('bs58check')

/**
 * bitcoin-js lib works with a strict one-byte size version prefix to be used by base58check encoding of bitcoin public key hash;
 * however, Equibit and other protocols may have a variable-length component structure (such as variable version prefix).
 * getEquibitAddress does the following:
 *  - takes hash160 of (version prefix based on network input + public key input)
 *  - passes the result to base58Check encoding
 * @param {Buffer} publicKey public key provided as buffer of hex values
 * @param {Object} network network configuration having information about the network such as prefix value for a public key hash on mainnet/testnet
 * @return {String} base58Check encoded address
 *
 * ```
 *  const network = {  // object containing all network objects
 *   type_of_netwpork: { // mainnet, testnet, equibit, bitcoin, etc.
 *    messagePrefix: ..., // fields/values are optional
 *    bech32: ...,
 *    bip32: {
 *      public: ...,
 *      private: ...
 *    },
 *    pubKeyHash: 0x035e5d, // pubKeyHash field/value need to be present as it is used by getEquibitAddress
 *    scriptHash: ...,
 *    wif: ...
 *   },
 *   { ... } // addtion network objects
 *  }
 * ```
 */
// getEquibitAddress :: (Buffer, Object) -> String
function getEquibitAddress (publicKey, network) {
  network = network || eqbNetworks.testnet
  let versionHex = convertDecToHexStr(network.pubKeyHash)
  let versionBufferHex = Buffer.from(versionHex, 'hex')
  let hashBufferHex = bitcoin.crypto.hash160(publicKey)
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

module.exports = {
  getEquibitAddress: getEquibitAddress
}
