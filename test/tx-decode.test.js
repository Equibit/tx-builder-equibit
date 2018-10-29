'use strict'
const Buffer = require('safe-buffer').Buffer
const assert = require('assert')
const bscript = require('bitcoinjs-lib').script
const { readVarInt } = require('tx-builder/src/buffer-read')
const { readInput, readInputs } = require('tx-builder/src/tx-decoder')
const { decodeTx, readOutput } = require('../src/tx-decoder-equibit')
const fixtures = require('./fixtures/tx-hex')
const fixture = fixtures[0]

describe('Decode hex', function () {
  const txHex = fixture.hex
  const buffer = Buffer.from(txHex, 'hex')

  describe('readInput VIN.0', function () {
    const offset = 4 + 1
    const [input, bufferLeft] = readInput(buffer.slice(offset))
    it('should read txid', function () {
      assert.equal(input.txid.toString('hex'), fixture.decoded.vin[0].txid)
    })
    it('should read vout index', function () {
      assert.equal(input.vout, fixture.decoded.vin[0].vout)
    })
    it('should read script', function () {
      assert.equal(input.scriptSig.toString('hex'), fixture.decoded.vin[0].scriptSig.hex)
    })
    // TODO: add decodeScript to tx-decoder.
    it('should decode script', function () {
      const scriptAsm = bscript.toASM(input.scriptSig)
      assert.equal(scriptAsm, fixture.decoded.vin[0].scriptSig.asm.replace('[ALL]', '01'))
    })
    it('should read sequence', function () {
      assert.equal(input.sequence, fixture.decoded.vin[0].sequence)
    })
    it('should leave some buffer', function () {
      assert.ok(bufferLeft)
    })
  })

  describe('readInput VIN.1', function () {
    const offset = fixture.hexItems.vin[1].offset
    const [input, bufferLeft] = readInput(buffer.slice(offset))
    it('should decode script', function () {
      const scriptAsm = bscript.toASM(input.scriptSig)
      assert.equal(scriptAsm, fixture.decoded.vin[1].scriptSig.asm.replace('[ALL]', '01'))
    })
    it('should leave some buffer', function () {
      assert.ok(bufferLeft)
    })
  })

  describe('readOutput', function () {
    const [ howManyOutputs, bufferLeft ] = readVarInt(buffer.slice(fixture.hexItems.voutOffset))
    const [ output, bufferLeft2 ] = readOutput(bufferLeft)

    it(`should read the number of outputs (${fixture.decoded.vout.length})`, function () {
      assert.equal(howManyOutputs, fixture.decoded.vout.length)
    })
    it('should read VOUT.0 value', function () {
      assert.equal(output.value, fixture.decoded.vout[0].value)
    })
    it('should read script', function () {
      assert.equal(output.script.toString('hex'), fixture.decoded.vout[0].scriptPubKey.hex)
    })
    it('should decode script', function () {
      const scriptAsm = bscript.toASM(output.script)
      assert.equal(scriptAsm, fixture.decoded.vout[0].scriptPubKey.asm)
    })
    it('should leave some buffer', function () {
      assert.ok(bufferLeft2)
      assert.ok(bufferLeft2.length < buffer.length)
    })
  })

  describe('readOutputs', function () {
    const offsetVout = fixture.hexItems.voutOffset
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
    it('should decode script of vout 1', function () {
      const scriptAsm = bscript.toASM(res[0].script)
      assert.equal(scriptAsm, fixture.decoded.vout[0].scriptPubKey.asm)
    })
    it('should decode script of vout 2', function () {
      const scriptAsm = bscript.toASM(res[1].script)
      assert.equal(scriptAsm, fixture.decoded.vout[1].scriptPubKey.asm)
    })
    it('should leave some buffer', function () {
      assert.ok(bufferLeft.length)
    })
    describe.skip('equibit data', function () {
      it('should read payment_currency', function () {
        assert.equal(res[0].equibit.payment_currency, fixture.decoded.vout[0].equibit.payment_currency)
      })
      it('should read payment_tx_id', function () {
        assert.equal(res[0].equibit.payment_tx_id, fixture.decoded.vout[0].equibit.payment_tx_id)
      })
      it('should read payload (empty string)', function () {
        assert.equal(res[0].equibit.issuance_json.toString('hex'), fixture.decoded.vout[0].equibit.issuance_json)
      })
      it('should read payment_currency', function () {
        assert.equal(res[1].equibit.payment_currency, fixture.decoded.vout[1].equibit.payment_currency)
      })
      it('should read payment_tx_id', function () {
        assert.equal(res[1].equibit.payment_tx_id, fixture.decoded.vout[1].equibit.payment_tx_id)
      })
      it('should read payload (JSON string)', function () {
        assert.equal(res[1].equibit.issuance_json.toString(), fixture.decoded.vout[1].equibit.issuance_json)
      })
    })
  })

  describe('decodeTx', function () {
    it('should decode empty eqb tx', function () {
      let decoded
      try {
        decoded = decodeTx(buffer)
      } catch (e) {
        console.log(e)
      }
      assert.equal(decoded[0].locktime, fixture.decoded.locktime)
    })
    xit('should decode issuance tx', function () {
      const fixture = require('./fixtures/tx-hex-issuance')[0]
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
  })

  describe('decodeTx SHA3', function () {
    it('should decode sha3 tx', function () {
      const fixture = require('./fixtures/tx-sha3')[0]
      const hex = fixture.hex
      const buffer = Buffer.from(hex, 'hex')
      let decoded
      try {
        decoded = decodeTx(buffer)
      } catch (e) {
        console.log(e)
      }
      // console.log(`decodeTx SHA3:::`, decoded[0].vout[0])
      assert.equal(decoded[0].vout[0].value, fixture.decoded.vout[0].value * Math.pow(10, 8))
      // assert.equal(decoded[0].vout[0].equibit.issuance_json.toString('ascii'), fixture.decoded.vout[0].equibit.issuance_json)
    })
  })
})
