// const varuint = require('varuint-bitcoin')
const assert = require('assert')
const {
  buildTx,
  buildEquibitData,
  bufferOutput,
  bufferInput,
  bufferInputs,
  buildTxCopy,
  vinScript
} = require('../src/tx-builder-equibit')
const fixtures = require('./fixtures/tx-hex')
const fixture = fixtures[0]
const fixtureNode = require('./fixtures/hdnode')

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
  describe('bufferOutput', function () {
    it('should build vout-0 buffer', function () {
      const buffer = bufferOutput(fixture.tx.vout[0])
      assert.equal(buffer.toString('hex'), fixture.hexItems.vout[0].hex)
    })
    it('should build vout-1 buffer', function () {
      const buffer = bufferOutput(fixture.tx.vout[1])
      assert.equal(buffer.toString('hex'), fixture.hexItems.vout[1].hex)
    })
  })

  describe('vinScript', function () {
    const keyPair = fixtureNode.keyPair
    it('should create vin script', function () {
      const script = vinScript(buildTxCopy)(fixture.tx, 0)(keyPair)
      assert.equal(script.toString('hex'), fixture.decoded.vin[0].scriptSig.hex)
    })
  })

  describe('bufferInput', function () {
    const keyPair = fixtureNode.keyPair
    it('should build vin', function () {
      const txVin = Object.assign({}, fixture.tx.vin[0], {
        keyPair
      })
      const buffer = bufferInput(fixture.tx)(txVin, 0)
      assert.equal(buffer.toString('hex'), fixture.hexItems.vin[0].hex)
    })
  })

  describe('bufferInputs', function () {
    it('should process vins', function () {
      const buffer = bufferInputs('vin', bufferInput)(fixture.tx)
      assert.equal(buffer.toString('hex'), '03' + fixture.hexItems.vin[0].hex + fixture.hexItems.vin[1].hex + fixture.hexItems.vin[2].hex)
    })
  })

  describe('buildTx', function () {
    it('should build a transaction', function () {
      const buffer = buildTx(fixture.tx)
      assert.equal(buffer.toString('hex'), fixture.hex)
    })
  })
})
