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
    // TODO: add decodeScript to tx-decoder and enable the test.
    // it('should read script', function () {
    //   assert.equal(input.script.toString('hex'), fixture.decoded.vin[0].scriptPubKey)
    // })
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
			assert.equal(output.script.toString('hex'), fixture.decoded.vout[0].script)
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
    it('should leave the buffer with the locktime (4 bytes)', function () {
      assert.ok(bufferLeft)
      assert.equal(bufferLeft.length - buffer.length, 4)
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
      console.log(decoded[0])
      console.log(`decoded hex = ${decoded[1].toString('hex')}, offset = ${buffer.length - decoded[1].length}`)
      // console.log(decoded[0].vin)
      assert.ok(decoded)
    })
  })
})
