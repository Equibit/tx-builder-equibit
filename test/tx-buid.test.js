const varuint = require('varuint-bitcoin')
const assert = require('assert')
const {
  // buildTx,
  buildEquibitData
} = require('../src/tx-builder-equibit')
const fixtures = require('./fixtures/tx-hex')
const fixture = fixtures[0]
// const fixtureNode = require('./fixtures/hdnode')

describe('tx-build-equibit', function () {
  describe('buildEquibitData', function () {
    it('should create a buffer with equibit data', function () {
      const obj = fixture.tx.vout[1].equibit
      const equibitData = fixture.hexItems.vout[1].equibit.hex
      assert.equal(buildEquibitData(obj).toString('hex'), equibitData)
    })
  })
  // describe('bufferOutput', function () {
  //   it('should build vout-1', function () {
  //     const buffer = bufferOutput(fixture.tx.vout[0])
  //     assert.equal(buffer.toString('hex'), fixture.hexItems.vout1)
  //   })
  // })
})
