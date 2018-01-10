const Buffer = require('safe-buffer').Buffer
// const randomBytes = require('randombytes')
const bitcoin = require('bitcoinjs-lib')
const bcrypto = bitcoin.crypto
// const bscript = bitcoin.script
// const baddress = bitcoin.address
const hdNode = require('../fixtures/hdnode').hdNode
const {
  hashTimelockContract
  // simpleHashlockContract,
  // simpleHashlockAddrContract,
  // simpleHashlockSigContract
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
const htlcScript = hashTimelockContract(addr1, addr0, hashSecret, 144)
// const htlcScript = simpleHashlockContract(hashSecret)            // OK
// const htlcScript = simpleHashlockAddrContract(addr1, hashSecret)
// const htlcScript = simpleHashlockSigContract(addr1, hashSecret)  // OK
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
    txid: 'e2efad46d8052c34fe986882c5c6f933163ff9bd55ba3882d06dbaa554693b16',
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
    txid: 'a82d7aa138e3273b2f9a99752dbbc03e17276ecc66896776d51cb2e26a0ca461',
    vout: 0,
    htlc: {
      secret: secret,
      refundAddr: addr0,
      timelock: 144
    },
    refundAddr: addr0,
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
