const varuint = require('varuint-bitcoin')
const assert = require('assert')
const {
  bufferInt32,
  bufferUInt64,
  bufferVarInt,
  bufferVarSlice
} = require('tx-builder/src/buffer-build')
const {
  buildTx,
  buildTxCopy,
  txCopyForHash,
  txCopySubscript,
  bufferInput,
  bufferInputs,
  bufferOutput,
  bufferHash,
  bufferInputEmptyScript,
  vinScript
} = require('../src/tx-builder-equibit')
const fixtures = require('./fixtures/tx-hex')
const fixture = fixtures[0]
const fixtureNode = require('./fixtures/hdnode')

describe('tx-build-equibit', function () {
  describe('buildEquibitData', function () {
    it('should create a buffer with hash', function () {
      const obj = fixture.
      const equibitData =
      assert.equal(buildEquibitData(obj).toString('hex'), equibitData)
    })
  })
  describe('bufferOutput', function () {
    it('should build vout-1', function () {
      const buffer = bufferOutput(fixture.tx.vout[0])
      assert.equal(buffer.toString('hex'), fixture.hexItems.vout1)
    })
  })
})
