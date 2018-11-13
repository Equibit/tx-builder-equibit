const bitcoin = require('bitcoinjs-lib')
const eqbNetworks = require('./networks-equibit')
const bs58check = require('bs58check')

/* bitcoin p2pkh file currently allows only a one-byte version prefix to be used by base58check encoding of the bit coin address (public key hash) if publioc key is provided as input;
   however, the Equibit protocol has a three-byte version prefix to be
   used by encoding publicKeyHash, scriptHash and WIF.

   getEquibitAddress :: buffer, object -> String
*/
function getEquibitAddress (publicKey, network) {
  network = network || eqbNetworks.testnet
  let versionHex = convertDecToHexStr(network.pubKeyHash)
  let versionBufferHex = Buffer.from(versionHex, 'hex')
  let hashBufferHex = bitcoin.crypto.hash160(publicKey)
  let payload = Buffer.concat([versionBufferHex, hashBufferHex])
  return bs58check.encode(payload)
}

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
