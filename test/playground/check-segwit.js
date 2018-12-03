const Buffer = require('safe-buffer').Buffer
const bitcoin = require('bitcoinjs-lib')
const builder = require('tx-builder').builder
const { hdNode, address1Bech32, keyPair } = require('../fixtures/hdnode')

// New Equibit node:
// curl --user 'equibitdev:jmx4wvlR1GU0nMct06btvexrDQ9Pi0_TC8cJhNs3kVE=' -H "Content-Type: application/json" -d '{"jsonrpc:":"1.0", "method":"getblockchaininfo"}' --verbose 169.53.165.114:18331

// console.log(`address1Bech32 = ${address1Bech32}`, hdNode)
// tb1qhn6l3jl02la469u5ad3x5a6juvw3k24tpxqxsx

//////////////////////////////////////////////////////
// Bitcoin node:
// curl --user 'equibitqa:V5yfZLWJAcQmM0EgUOK8oSCDvqjQ9e8XU6jVUBTXsI8=' -H "Content-Type: application/json" -d '{"jsonrpc:":"1.0", "method":"getblockchaininfo"}' --verbose 169.55.144.155:18332
// curl --user 'equibitqa:V5yfZLWJAcQmM0EgUOK8oSCDvqjQ9e8XU6jVUBTXsI8=' -H "Content-Type: application/json" -d '{"jsonrpc":"1.0", "method":"generatetoaddress","params":[100,"tb1qhn6l3jl02la469u5ad3x5a6juvw3k24tpxqxsx"]}' 169.55.144.155:18332
// curl --user 'equibitqa:V5yfZLWJAcQmM0EgUOK8oSCDvqjQ9e8XU6jVUBTXsI8=' -H "Content-Type: application/json" -d '{"jsonrpc":"1.0", "method":"importaddress","params":["mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna", "", 0]}' 169.55.144.155:18332
// curl --user 'equibitqa:V5yfZLWJAcQmM0EgUOK8oSCDvqjQ9e8XU6jVUBTXsI8=' -H "Content-Type: application/json" -d '{"jsonrpc":"1.0", "method":"listunspent","params":[0, 99999, ["mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna"]]}' 169.55.144.155:18332


// Base58 -> P2PKH Base58
// UTXO:
// {"txid":"70663b23307c619dba4a454dec4652eab7d28cca91d51d313232ae9d695bbd0b","vout":0,"address":"mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna", "amount":5.35}
const utxo = {txid: '70663b23307c619dba4a454dec4652eab7d28cca91d51d313232ae9d695bbd0b',vout: 0,address: 'mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna', amount: Math.round(5.35 * 1e8)}
// 01000000010bbd5b699dae3232311dd591ca8cd2b7ea5246ec4d454aba9d617c30233b6670000000006b483045022100b4169599345bdb3a1dad671dc021eb33b7a347835f04ef7fd071b45a0f132e9602203398e3d2405f76776954e5c5a8f5bd1e40d716bd21cc83089de98395d69492a5012103a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3ffffffff02204e0000000000001976a914bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab88acb821e31f000000001976a9143c8710460fc63d27e6741dd1927f0ece41e9b55588ac00000000
// Result: 7db6a2711e0f8a75c2bf906ffacab3815d246706c74a16593b67d9ddd1fc42bf
const txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet)
txb.setVersion(1)
txb.addInput(utxo.txid, utxo.vout)
txb.addOutput('mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt', 2e4)
txb.addOutput('mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna', Math.round(utxo.amount - 2e4 - 1e3))
txb.sign(0, keyPair)
const tx = txb.build()
// console.log(`tx = ${tx.toHex()}`)


// Base58 -> P2WPKH Bech32
// const utxo2 = {txid: '7db6a2711e0f8a75c2bf906ffacab3815d246706c74a16593b67d9ddd1fc42bf', vout: 1,address:'mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna', amount: Math.round(5.34979 * 1e8)}
const utxo2 = {txid: '773269c1dca2a1798f89b903504a520acfaf3df0e662ba154bc9c5ae50850f9e', vout: 0,address:'TQaJyoNCGvMrZNWiyipKaVgLrPr3PESSf9cZ', amount: Math.round(3.05780728 * 1e8)}
// Transaction with a SegWit P2WPKH input
// https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/transactions.js#L174
// const txb = new bitcoin.TransactionBuilder(regtest)
// txb.addInput(unspent.txId, unspent.vout, null, p2wpkh.output) // NOTE: provide the prevOutScript!
// txb.addOutput(regtestUtils.RANDOM_ADDRESS, 2e4)
// txb.sign(0, keyPair, null, null, unspent.value) // NOTE: no redeem script
// const tx = txb.build()
const txb2 = new bitcoin.TransactionBuilder(bitcoin.networks.testnet)
txb2.setVersion(1)
txb2.addInput(utxo2.txid, utxo2.vout)
txb2.addOutput('tb1qhn6l3jl02la469u5ad3x5a6juvw3k24tpxqxsx', 23e4)
txb2.addOutput('mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna', Math.round(utxo2.amount - 23e4 - 1e3))
txb2.sign(0, keyPair)
const tx2 = txb2.build()
console.log(`\n\ntx2 (eqb) = ${tx2.toHex()}`)
// 0100000001bf42fcd1ddd9673b59164ac70667245d81b3cafa6f90bfc2758a0f1e71a2b67d010000006b483045022100c49ea5f2a2a7254ef72eab3a7efdd42c5c4c1e244d7ce59e922cd7eaf7175b210220041d515644855007dfed1c5fd6773f3a2199aa096649a8decf862982a9a9f358012103a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3ffffffff02b01e040000000000160014bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab20ffde1f000000001976a9143c8710460fc63d27e6741dd1927f0ece41e9b55588ac00000000
// Result: 828dd0ae26d8176270f8f1fc98932043cb56d2c41eedff3df2df215b1a6a56bb
// UTXO (notice address prefix!!!):
// https://api-qa-wallet.equibitgroup.com/proxycore?node=btc&method=listunspent&params[0]=0&params[1]=99999&params[2][]=bcrt1qhn6l3jl02la469u5ad3x5a6juvw3k24tr0et80
//   tb1qhn6l3jl02la469u5ad3x5a6juvw3k24tpxqxsx
// bcrt1qhn6l3jl02la469u5ad3x5a6juvw3k24tr0et80
// Equibit tx to bech32:
// 0100000001f056d18ec1b21fb0a707d0af6d75142aa5eb66a5e308a283effa52f102997f26000000006b483045022100ed6058426b59ed71bfbaec983e9c09fd8a9046263839af4e94df926224602838022056352bd96c062137e5d2db3e2fe093370f87840c03e6c57a4a0b6a60ea48245c012103a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3ffffffff027082030000000000160014bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab09463612000000001976a9143c8710460fc63d27e6741dd1927f0ece41e9b55588ac00000000
// recipient address: bcrt1qhn6l3jl02la469u5ad3x5a6juvw3k24tr0et80