const Buffer = require('safe-buffer').Buffer
const randomBytes = require('randombytes')
const bitcoin = require('bitcoinjs-lib')
const bcrypto = bitcoin.crypto
const bscript = bitcoin.script
const baddress = bitcoin.address
const hdNode = require('../fixtures/hdnode').hdNode
const {
  hashTimelockContract,
  simpleHashlockContract,
  simpleHashlockAddrContract,
  simpleHashlockSigContract
} = require('../../src/script-builder')
const { buildTx } = require('../../src/tx-builder-equibit')

const node0 = hdNode.derive(0)
const node1 = hdNode.derive(1)
const addr0 = node0.getAddress()                        // moFbsgEQZMCzRNMftrp6hst8iqrxmqEuf4,
const addr1 = node1.getAddress()                        // mzWJ35ui9iizfTiypu8Aq7oWPb6gWbRvTe
console.log(`addr0 = ${addr0}, addr1 = ${addr1}`)

// const secretBuffer = randomBytes(32)
const secretBuffer = Buffer.from('d7913af1429cdb20ff3caf621368a9040361524895311180487a5c06df3fd9ae', 'hex')
const secret = secretBuffer.toString('hex')             // d7913af1429cdb20ff3caf621368a9040361524895311180487a5c06df3fd9ae,
const hashSecretBuffer = bcrypto.sha256(secretBuffer)
const hashSecret = hashSecretBuffer.toString('hex')     // 88f1f9dcce43d0aea877b6be5d5ed4b90a470b151ccab39bc8d57584e6be03c7
console.log(`secret = ${secret}, hashSecret = ${hashSecret}`)

// HTLC SCRIPT:
// const htlcScript = hashTimelockContract(toAddress, refundAddress, hashlock, timelock)
// const htlcScript = simpleHashlockContract(hashSecret)
// const htlcScript = simpleHashlockAddrContract(addr1, hashSecret)
const htlcScript = simpleHashlockSigContract(addr1, hashSecret)
console.log(`htlcScript = ${htlcScript.toString('hex')}`)

const equibitData = {
  payment_currency: 0,
  payment_tx_id: '',
  issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
  issuance_json: ''
}

// 1
// 3.10272423
// OP_SHA256 30a25fd2080642223b0ad2e2923dae47d6529db1e42eba43a8681b9f117147c8 OP_EQUAL
// 33eddd66957dcec9d70e4b43a924c318b6a4a677055c0b1c8faa925fbda6cfac
const txConfig = {
  version: 1,
  locktime: 104,
  vin: [{
    txid: '05ff7879d75dc37866e5cab8a088a9ceb3ef56e5eae945b0183410eddbb3b00a',
    vout: 0,
    keyPair: node0.keyPair,
    sequence: 4294967294
  }],
  vout: [{
    value: 0.1 * 100000000,
    scriptPubKey: htlcScript,
    equibit: equibitData
  }, {
    value: 3 * 100000000,
    address: addr0,
    equibit: equibitData
  }]
}
const tx = buildTx(txConfig)
console.log(`tx = ${tx.toString('hex')}`)

// 2
const txConfigSpend = {
  version: 1,
  locktime: 104,
  vin: [{
    txid: '1a264c2ae371b0b4790ba5cc9f7b4c4f8ebb77f91cc9fd2631012d80e7341997',
    vout: 0,
    htlcSecret: 'd7913af1429cdb20ff3caf621368a9040361524895311180487a5c06df3fd9ae', //secret,
    keyPair: node1.keyPair,
    sequence: 4294967294
  }],
  vout: [{
    value: 0.0999 * 100000000,
    address: addr0,
    equibit: equibitData
  }]
}
const txSpend = buildTx(txConfigSpend)
console.log(`txSpend = ${txSpend.toString('hex')}`)
