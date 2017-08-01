'use strict'
const Buffer = require('safe-buffer').Buffer
const assert = require('assert')
const { readVarInt } = require('tx-decoder/src/buffer-utils')
const { readInput, readInputs } = require('tx-decoder/src/tx-decoder')
const { decodeTx, readOutput } = require('../src/tx-decoder-equibit')
const fixtures = require('./fixtures')
const fixture = fixtures[0]

describe('Decode hex', function () {
  const txHex = fixture.hex
  const buffer = Buffer.from(txHex, 'hex')

  describe('readInput', function () {
    const offsetVersionAndVinLength = 4 + 1
    const [input, bufferLeft] = readInput(buffer.slice( offsetVersionAndVinLength ))
    it('should read hash', function () {
      assert.equal(input.hash.toString('hex'), fixture.decoded.vin[0].txid)
    })
    it('should read index', function () {
      assert.equal(input.index, fixture.decoded.vin[0].vout)
    })
    // TODO: add decodeScript to tx-decoder.
    it('should read script', function () {
      assert.equal(input.script.toString('hex'), fixture.decoded.vin[0].scriptSig.hex)
    })
    it('should read sequence', function () {
      assert.equal(input.sequence, fixture.decoded.vin[0].sequence)
    })
    it('should leave some buffer', function () {
      assert.ok(bufferLeft)
    })
  })

	describe('readOutput', function () {
		const offsetVout = fixture.offsetVout
	  const [ howManyOutputs, bufferLeft ] = readVarInt(buffer.slice(offsetVout))
    it('should read the number of outputs', function () {
      assert.equal(howManyOutputs, fixture.decoded.vout.length)
    })

		const [output, bufferLeft2] = readOutput(bufferLeft)
		it('should read value', function () {
			assert.equal(output.value, fixture.decoded.vout[0].value)
		})
		it('should read script', function () {
			assert.equal(output.script.toString('hex'), fixture.decoded.vout[0].scriptPubKey.hex)
		})
		it('should leave some buffer', function () {
			assert.ok(bufferLeft2)
			assert.ok(bufferLeft2.length < buffer.length)
		})
	})

	describe('readOutputs', function () {
		const offsetVout = fixture.offsetVout
	  const [ res, bufferLeft ] = readInputs(readOutput)(buffer.slice(offsetVout))
    it('should read the number of outputs', function () {
      assert.equal(res.length, fixture.decoded.vout.length)
    })
		it('should read the value of the 1st output', function () {
			assert.equal(res[0].value, fixture.decoded.vout[0].value)
		})
		it('should read the value of the 2nd output', function () {
			assert.equal(res[1].value, fixture.decoded.vout[1].value)
		})
    describe('equibit data', function () {
      it('should read payment_currency', function () {
        assert.equal(res[0].equibit.payment_currency, fixture.decoded.vout[0].equibit.payment_currency)
      })
      it('should read payment_tx_id', function () {
        assert.equal(res[0].equibit.payment_tx_id, fixture.decoded.vout[0].equibit.payment_tx_id)
      })
      it('should read payload (empty string)', function () {
        assert.equal(res[0].equibit.payload.toString('hex'), fixture.decoded.vout[0].equibit.payload)
      })
      it('should read payment_currency', function () {
        assert.equal(res[1].equibit.payment_currency, fixture.decoded.vout[1].equibit.payment_currency)
      })
      it('should read payment_tx_id', function () {
        assert.equal(res[1].equibit.payment_tx_id, fixture.decoded.vout[1].equibit.payment_tx_id)
      })
      it('should read payload (JSON string)', function () {
        assert.equal(res[1].equibit.payload.toString(), fixture.decoded.vout[1].equibit.payload)
      })
    })
	})

  describe('decodeTx', function () {
    it('should decode tx', function () {
      let decoded
      try {
        decoded = decodeTx(buffer)
      } catch (e) {
        console.log(e)
      }
      assert.equal(decoded[0].locktime, fixture.decoded.locktime)
    })
  })
})
