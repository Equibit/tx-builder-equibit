const bip39 = require('bip39')
const bip32 = require('bip32')
const bitcoin = require('bitcoinjs-lib')
const { getAddress } = require('tx-builder/src/utils')

const mnemonic = 'talent destroy radar dinosaur punch muscle swear diary mango unit gallery bus'
const seed = bip39.mnemonicToSeed(mnemonic, '')
const root = bip32.fromSeed(seed, bitcoin.networks.testnet)
const hdNode = root.derivePath(`m/44'/0'/0'`)

const addrHdNode = hdNode.derive(0).derive(0)
const { address } = getAddress(addrHdNode.publicKey, { network: bitcoin.networks.testnet })
const xpub = hdNode.neutered().toBase58()
const keyPair = bitcoin.ECPair.fromPrivateKey(addrHdNode.privateKey)

const addrHdNode1 = hdNode.derive(0).derive(1)
const address1 = getAddress(addrHdNode1.publicKey, { network: bitcoin.networks.testnet }).address
const keyPair1 = bitcoin.ECPair.fromPrivateKey(addrHdNode1.privateKey)

// 0: mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna
// 1: mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt
// 2: n1nXTT79FU2bwHTLXQkydzfT7biCxW4ZqE
// console.log(`*** fixture address=${address}`)

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
