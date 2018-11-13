// const varuint = require('varuint-bitcoin')
const decoder = require('tx-builder').decoder
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
const fixturesSha3 = require('./fixtures/tx-sha3')
const fixturesIssuance = require('./fixtures/tx-hex-issuance')
const fixtureNode = require('./fixtures/hdnode')
const scriptBuilder = require('../src/script-builder')
const fixtureHtlc = require('./fixtures/tx-htlc')

const { hashTimelockContract } = scriptBuilder

describe('tx-build-equibit', function () {
  const fixture = fixtures[0]
  const keyPair = fixtureNode.keyPair
  const keyPair1 = fixtureNode.keyPair1
  fixture.tx.vin[0].keyPair = keyPair
  fixture.tx.vin[1].keyPair = keyPair
  fixture.tx.vin[2].keyPair = keyPair

  describe('build equibit data', function () {
    xit('should create a buffer with empty equibit data', function () {
      const obj = fixture.tx.vout[0].equibit
      const equibitData = fixture.hexItems.vout[0].equibit.hex
      assert.equal(buildEquibitData(obj).toString('hex'), equibitData)
    })

    xit('should create a buffer with equibit data', function () {
      const obj = fixture.tx.vout[1].equibit
      const equibitData = fixture.hexItems.vout[1].equibit.hex
      assert.equal(buildEquibitData(obj).toString('hex'), equibitData)
    })

    it('should build vout buffers', function () {
      fixture.tx.vout.forEach((vout, v) => {
        const buffer = bufferOutputEqb({})(vout)
        assert.equal(buffer.toString('hex'), fixture.hexItems.vout[v].hex, `can build vout #${v} buffer`)
      })
    })
  })

  describe('vins', function () {
    const keyPair = fixtureNode.keyPair

    it('should create vin script', function () {
      const script = vinScript(buildTxCopyEqb({}), { hashTimelockContract })(fixture.tx, 0)(keyPair)
      assert.equal(script.toString('hex'), fixture.decoded.vin[0].scriptSig.hex)
    })

    it('should process and build vins', function () {
      const txVin = Object.assign({}, fixture.tx.vin[0], { keyPair })
      let buffer = bufferInputEqb({})(fixture.tx)(txVin, 0)
      assert.equal(buffer.toString('hex'), fixture.hexItems.vin[0].hex, 'vin can be built with input eqb')

      buffer = bufferInputs('vin', bufferInputEqb({}))(fixture.tx)
      assert.equal(
        buffer.toString('hex'),
        '03' + fixture.hexItems.vin[0].hex + fixture.hexItems.vin[1].hex + fixture.hexItems.vin[2].hex,
        'vins can be processed with inputs'
      )
    })
  })

  describe('build tx', function () {
    it('should build an empty eqb transaction', function () {
      const buffer = buildTx(fixture.tx, {})
      assert.equal(buffer.toString('hex'), fixture.hex)
    })

    it('should build an issuance transaction', function () {
      const fixture = fixturesIssuance[0]
      const tx = fixture.tx
      tx.vin.forEach(vin => { vin.keyPair = fixtureNode.keyPair })
      const buffer = buildTx(tx, {})
      assert.equal(buffer.toString('hex'), fixture.hex)
    })

    it('should build an HTLC transaction', function () {
      const secretHash = fixtureHtlc.secretHash
      const tx = fixtureHtlc.tx
      tx.vin[0].keyPair = keyPair
      const htlcScript = scriptBuilder.hashTimelockContract(tx.vout[0].receiverAddr, tx.vout[0].refundAddr, secretHash, tx.vout[0].locktime)
      assert.equal(htlcScript.length, 90, 'htlc script length is valid')
      tx.vout[0].scriptPubKey = htlcScript
      const buffer = buildTx(tx)
      assert.equal(buffer.toString('hex'), fixtureHtlc.hex, 'built hex is correct')
    })
  })

  describe('SHA3', function () {
    const options = { sha: 'SHA3_256' }

    it('should build HTLC locking transaction with SHA3', function () {
      const fixture = fixturesSha3[1]
      const tx = fixture.tx
      tx.vin.forEach(vin => { vin.keyPair = keyPair })

      const htlcScript = scriptBuilder.hashTimelockContract(
        tx.vout[0].receiverAddr,
        tx.vout[0].refundAddr,
        fixture.secretHash,
        tx.vout[0].locktime
      )
      assert.equal(htlcScript.length, 90)

      tx.vout[0].scriptPubKey = htlcScript
      const buffer = buildTx(tx, options)
      assert.equal(buffer.toString('hex'), fixture.hex)
    })

    it('should build HTLC unlocking transaction with SHA3', function () {
      const fixture = fixturesSha3[2]
      const tx = fixture.tx
      tx.vin.forEach(vin => { vin.keyPair = keyPair1 })

      const buffer = buildTx(tx, { ...options, hashTimelockContract: scriptBuilder.hashTimelockContract })
      assert.equal(buffer.toString('hex'), fixture.hex)
    })

    it('should build P2PKH transaction with SHA3', function () {
      const fixture = fixturesSha3[3]
      const tx = fixture.tx
      tx.vin.forEach(vin => { vin.keyPair = fixtureNode.keyPair2 })

      const buffer = buildTx(fixture.tx, options)
      assert.equal(buffer.toString('hex'), fixture.hex)

      const txid = decoder.getTxId(options)(buffer)
      assert(txid, fixture.txid)
    })
  })
})
