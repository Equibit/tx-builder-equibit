const bip39 = require('bip39')
const bip32 = require('bip32')
const bitcoin = require('bitcoinjs-lib')
const Buffer = require('buffer').Buffer
const { getAddress, getAddressBech32 } = require('tx-builder/src/utils')
const { getEquibitAddress } = require('../../src/utils')
const equibitNetwork = require('../../src/networks-equibit')

const mnemonic = 'talent destroy radar dinosaur punch muscle swear diary mango unit gallery bus'
const seed = bip39.mnemonicToSeed(mnemonic, '')
const root = bip32.fromSeed(seed, bitcoin.networks.testnet)
const hdNode = root.derivePath(`m/44'/0'/0'`)

const addrHdNode = hdNode.derive(0).derive(0)
const { address } = getAddress(addrHdNode.publicKey, { network: bitcoin.networks.testnet })
const addressEqb = getEquibitAddress(addrHdNode.publicKey, equibitNetwork.testnet)
// TQaJyoNCGvMrZNWiyipKaVgLrPr3PESSf9cZ
console.log(`addressEqb = ${addressEqb}`)
const xpub = hdNode.neutered().toBase58()
const keyPair = bitcoin.ECPair.fromPrivateKey(addrHdNode.privateKey, { network: bitcoin.networks.testnet })
console.log(`privateKey = ${keyPair.toWIF()}`)
console.log(`publicKey hex = ${keyPair.publicKey.toString('hex')}`)

const addrHdNode1 = hdNode.derive(0).derive(1)
const address1 = getAddress(addrHdNode1.publicKey, { network: bitcoin.networks.testnet }).address
const keyPair1 = bitcoin.ECPair.fromPrivateKey(addrHdNode1.privateKey, { network: bitcoin.networks.testnet })

const keyPair2 = bitcoin.ECPair.fromPrivateKey(Buffer.from('0000000000000000000000000000000000000000000000000000000000000003', 'hex'))
// 0: mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna
// 1: mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt
// 2: n1nXTT79FU2bwHTLXQkydzfT7biCxW4ZqE
// console.log(`*** fixture address=${address}`)
// Equibit prefix:
// ex: TQaEa8T4RKJPNX7VDrjVhpthvQoHeDFMZNcv
// prefix=
// 0: TQaJyoNCGvMrZNWiyipKaVgLrPr3PESSf9cZ


// Bech32 address:
// 0: tb1qhn6l3jl02la469u5ad3x5a6juvw3k24tpxqxsx
// const address1Bech32 = getAddressBech32(addrHdNode1.publicKey, { network: bitcoin.networks.testnet })
const address1Bech32 = getAddressBech32(addrHdNode1.publicKey, { network: equibitNetwork.testnet })
console.log(`address1Bech32 eqb = ${address1Bech32}`)
// 0: tq1qhn6l3jl02la469u5ad3x5a6juvw3k24t99e86f

module.exports = {
  hdNode,
  addrHdNode,
  address,
  keyPair,
  xpub,

  addrHdNode1,
  address1,
  address1Bech32,
  keyPair1,

  keyPair2
}
