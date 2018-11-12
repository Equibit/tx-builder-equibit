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
  let versionHex = ('000000' + (network.pubKeyHash).toString(16)).slice(-6)
  let versionBufferHex = Buffer.from(versionHex, 'hex')
  let hashBufferHex = bitcoin.crypto.hash160(publicKey)
  let payload = Buffer.concat([versionBufferHex, hashBufferHex])
  return bs58check.encode(payload)
}

module.exports = {
  getEquibitAddress: getEquibitAddress
}
