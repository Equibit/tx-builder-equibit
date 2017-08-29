// txid: d7b0237b6b14d4b1a652d450a95c7c47c8b56b5e81d3452a5a579f129c3a5fca
// vout: 0
// amount: 25
// from address:  mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna
// to:            mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt

const { buildTx } = require('../src/tx-builder-equibit')
const fixtureNode = require('./fixtures/hdnode')

const tx = {
  version: 1,
  locktime: 104,
  vin: [{
    hash: 'd7b0237b6b14d4b1a652d450a95c7c47c8b56b5e81d3452a5a579f129c3a5fca',
    index: 0,
    script: '',
    sequence: 4294967294
  }],
  vout: [{
    value: 1 * 100000000,
    address: 'mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt',
    equibit: {
      payment_currency: 0,
      payment_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
      issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
      payload: ''
    }
  }, {
    value: (25 - 1 - 0.0001) * 100000000,
    address: 'mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna',
    equibit: {
      payment_currency: 0,
      payment_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
      issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
      payload: ''
    }
  }]
}

tx.vin[0].keyPair = fixtureNode.keyPair
let buffer
try {
  buffer = buildTx(tx)
} catch (e) {
  console.log('Error: ', e)
}

if (buffer && buffer.toString) {
  console.log(`ex1: buffer = ${buffer.toString('hex')}`)
}
