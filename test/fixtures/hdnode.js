const bip39 = require('bip39')
const bip32 = require('bip32')
const bitcoin = require('bitcoinjs-lib')
const equibitNetworks = require('../../src/networks-equibit')
const { getEquibitAddress } = require('../../src/utils')

const mnemonic = 'talent destroy radar dinosaur punch muscle swear diary mango unit gallery bus'
const seed = bip39.mnemonicToSeed(mnemonic, '')
const root = bip32.fromSeed(seed, bitcoin.networks.testnet)
const hdNode = root.derivePath(`m/44'/0'/0'`)

const addrHdNode = hdNode.derive(0).derive(0)
const address = getEquibitAddress(addrHdNode.publicKey, equibitNetworks.testnet)
const xpub = hdNode.neutered().toBase58()
const keyPair = bitcoin.ECPair.fromPrivateKey(addrHdNode.privateKey)

const addrHdNode1 = hdNode.derive(0).derive(1)
const address1 = getEquibitAddress(addrHdNode1.publicKey, equibitNetworks.testnet)
const keyPair1 = bitcoin.ECPair.fromPrivateKey(addrHdNode1.privateKey)

module.exports = {
  hdNode,
  addrHdNode,
  address,
  keyPair,
  xpub,

  addrHdNode1,
  address1,
  keyPair1
}
