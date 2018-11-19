'use strict'
const Buffer = require('safe-buffer').Buffer
const assert = require('assert')
const { readVarInt } = require('tx-builder/src/buffer-read')
const { readInput, readInputs } = require('tx-builder/src/tx-decoder')
const { decodeTx, readOutput } = require('../src/tx-decoder-equibit')
const fixtures = require('./fixtures/tx-hex')
const fixturesIssuance = require('./fixtures/tx-hex-issuance')
const fixturesSha3 = require('./fixtures/tx-sha3')

describe('tx-decode-equibit', function () {
  describe('read inputs and outputs', function () {
    const fixture = fixtures[0]
    const hex = fixture.hex
    const buffer = Buffer.from(hex, 'hex')

    it('should read the 1st vin', function () {
      const offset = 4 + 1
      const [input, bufferLeft] = readInput(buffer.slice(offset))

      assert.equal(input.txid.toString('hex'), fixture.decoded.vin[0].txid, 'txid can be read')
      assert.equal(input.vout, fixture.decoded.vin[0].vout, 'vout index can be read')
      assert.equal(input.scriptSig.hex, fixture.decoded.vin[0].scriptSig.hex, 'script signature can be read')
      // TODO: add decodeScript to tx-decoder.
      assert.equal(input.scriptSig.asm, fixture.decoded.vin[0].scriptSig.asm.replace('[ALL]', '01'), 'script can be decoded')
      assert.equal(input.sequence, fixture.decoded.vin[0].sequence, 'sequence number can be read')
      assert.ok(bufferLeft, 'some buffer is left')
    })

    it('should read the 1st vout', function () {
      const [ numOutputs, bufferLeft ] = readVarInt(buffer.slice(fixture.hexItems.voutOffset))
      const [ output, bufferLeft2 ] = readOutput(bufferLeft)

      assert.equal(numOutputs, fixture.decoded.vout.length, 'number of outputs can be read')
      assert.equal(output.value, fixture.decoded.vout[0].value, 'the 1st vout can be read')
      assert.equal(output.scriptPubKey.hex, fixture.decoded.vout[0].scriptPubKey.hex, 'script can be read')
      assert.equal(output.scriptPubKey.asm, fixture.decoded.vout[0].scriptPubKey.asm, 'script can be decoded')
      assert.ok(bufferLeft2 && bufferLeft2.length < buffer.length, 'some buffer is left')
    })

    it('should read all vouts', function () {
      const [ res, bufferLeft ] = readInputs(readOutput)(buffer.slice(fixture.hexItems.voutOffset))

      assert.equal(res.length, fixture.decoded.vout.length, 'number of vouts can be read')
      res.forEach((vout, v) => {
        assert.equal(vout.value, fixture.decoded.vout[v].value, `the value of vout #${v} can be read`)
        assert.equal(vout.scriptPubKey.asm, fixture.decoded.vout[v].scriptPubKey.asm, `the script of vout #${v} can be decoded`)
      })
      assert.ok(bufferLeft.length)
    })

    xit('should read equibit data', function () {
      const [ res ] = readInputs(readOutput)(buffer.slice(fixture.hexItems.voutOffset))

      res.forEach((vout, v) => {
        assert.equal(
          vout.equibit.payment_currency,
          fixture.decoded.vout[v].equibit.payment_currency,
          `payment_currency of vout ${v} can be read`
        )
        assert.equal(
          vout.equibit.issuance_json.toString('hex'),
          fixture.decoded.vout[v].equibit.issuance_json,
          `payment_tx_id of vout ${v} can be read`
        )
        assert.equal(
          vout.equibit.issuance_json.toString(),
          fixture.decoded.vout[v].equibit.issuance_json,
          `payload (empty string) of vout ${v} can be read`
        )
      })
    })
  })

  describe('decode transaction', function () {
    it('should decode empty eqb tx', function () {
      const fixture = fixtures[0]
      const buffer = Buffer.from(fixture.hex, 'hex')
      let decoded
      try {
        decoded = decodeTx(buffer)
      } catch (e) {
        console.log(e)
      }
      assert.equal(decoded[0].locktime, fixture.decoded.locktime)
    })

    xit('should decode issuance tx', function () {
      const fixture = fixturesIssuance[0]
      const hex = fixture.hex
      const buffer = Buffer.from(hex, 'hex')
      let decoded
      try {
        decoded = decodeTx(buffer)
      } catch (e) {
        console.log(e)
      }
      assert.equal(decoded[0].vout[0].equibit.issuance_json.toString('ascii'), fixture.decoded.vout[0].equibit.issuance_json)
    })

    it('sould decode SHA3 tx', function () {
      const fixture = fixturesSha3[3] // fixturesSha3[0]
      const hex = fixture.hex
      const buffer = Buffer.from(hex, 'hex')
      let decoded
      try {
        decoded = decodeTx(buffer)
      } catch (e) {
        console.log(e)
      }
      assert.equal(decoded[0].vin[0].vout, fixture.decoded.vin[0].vout)
      assert.equal(decoded[0].vout[0].value, fixture.decoded.vout[0].value * Math.pow(10, 8))
    })
  })
})
