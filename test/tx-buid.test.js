const varuint = require('varuint-bitcoin')
const assert = require('assert')
const {
  // buildTx,
  buildEquibitData,
  bufferOutput
} = require('../src/tx-builder-equibit')
const fixtures = require('./fixtures/tx-hex')
const fixture = fixtures[0]
// const fixtureNode = require('./fixtures/hdnode')

describe('tx-build-equibit', function () {
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
})
