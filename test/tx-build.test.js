// const varuint = require('varuint-bitcoin')
const assert = require('assert')
const {
  buildTx,
  buildEquibitData,
  bufferOutputEqb,
  bufferInputEqb,
  bufferInputs,
  buildTxCopyEqb,
  vinScript
} = require('../src/tx-builder-equibit')
const fixtures = require('./fixtures/tx-hex')
const fixture = fixtures[0]
const fixtureNode = require('./fixtures/hdnode')
const scriptBuilder = require('../src/script-builder')
const fixtureHtlc = require('./fixtures/tx-htlc')

describe('tx-build-equibit', function () {
  const keyPair = fixtureNode.keyPair
  fixture.tx.vin[0].keyPair = keyPair
  fixture.tx.vin[1].keyPair = keyPair
  fixture.tx.vin[2].keyPair = keyPair

  describe('buildEquibitData', function () {
    it('should create a buffer with empty equibit data', function () {
      const obj = fixture.tx.vout[0].equibit
      const equibitData = fixture.hexItems.vout[0].equibit.hex
      assert.equal(buildEquibitData(obj).toString('hex'), equibitData)
    })
    it('should create a buffer with equibit data', function () {
      const obj = fixture.tx.vout[1].equibit
      const equibitData = fixture.hexItems.vout[1].equibit.hex
      assert.equal(buildEquibitData(obj).toString('hex'), equibitData)
    })
  })
  describe('bufferOutputEqb', function () {
    it('should build vout-0 buffer', function () {
      const buffer = bufferOutputEqb(fixture.tx.vout[0])
      assert.equal(buffer.toString('hex'), fixture.hexItems.vout[0].hex)
    })
    it('should build vout-1 buffer', function () {
      const buffer = bufferOutputEqb(fixture.tx.vout[1])
      assert.equal(buffer.toString('hex'), fixture.hexItems.vout[1].hex)
    })
  })

  describe('vinScript', function () {
    const keyPair = fixtureNode.keyPair
    it('should create vin script', function () {
      const script = vinScript(buildTxCopyEqb)(fixture.tx, 0)(keyPair)
      assert.equal(script.toString('hex'), fixture.decoded.vin[0].scriptSig.hex)
    })
  })

  describe('bufferInputEqb', function () {
    const keyPair = fixtureNode.keyPair
    it('should build vin', function () {
      const txVin = Object.assign({}, fixture.tx.vin[0], {
        keyPair
      })
      const buffer = bufferInputEqb(fixture.tx)(txVin, 0)
      assert.equal(buffer.toString('hex'), fixture.hexItems.vin[0].hex)
    })
  })

  describe('bufferInputs', function () {
    it('should process vins', function () {
      const buffer = bufferInputs('vin', bufferInputEqb)(fixture.tx)
      assert.equal(buffer.toString('hex'), '03' + fixture.hexItems.vin[0].hex + fixture.hexItems.vin[1].hex + fixture.hexItems.vin[2].hex)
    })
  })

  describe('buildTx', function () {
    it('should build an empty eqb transaction', function () {
      const buffer = buildTx(fixture.tx)
      assert.equal(buffer.toString('hex'), fixture.hex)
    })
    it('should build an issuance transaction', function () {
      const fixture = require('./fixtures/tx-hex-issuance')[0]
      const tx = fixture.tx
      tx.vin.forEach(vin => { vin.keyPair = fixtureNode.keyPair })
      const buffer = buildTx(tx)
      assert.equal(buffer.toString('hex'), fixture.hex)
    })
  })

  describe('build HTLC transaction', function () {
    // const secretPair = scriptBuilder.generateSecret(16)
    // const secretHash = secretPair.hash.toString('hex')
    const secretHash = fixtureHtlc.secretHash
    const tx = fixtureHtlc.tx
    tx.vin[0].keyPair = keyPair
    it('should build a valid transaction with HTLC locking script', function () {
      const htlcScript = scriptBuilder.hashTimelockContract(tx.vout[0].receiverAddr, tx.vout[0].refundAddr, secretHash, tx.vout[0].locktime)
      // console.log(`htlcScript ${htlcScript.length} = ${htlcScript.toString('hex')}`)
      assert.equal(htlcScript.length, 90)
      tx.vout[0].scriptPubKey = htlcScript
      const buffer = buildTx(tx)
      // console.log(`htlc buffer tx = ${buffer.toString('hex')}`)
      assert.equal(buffer.toString('hex'), fixtureHtlc.hex)
    })
  })
})
