const assert = require('assert')
const fixtureNode = require('./fixtures/hdnode')
const scriptBuilder = require('../src/script-builder')

const addrHdNode = fixtureNode.addrHdNode

describe('script-builder', function () {
  const addr = addrHdNode.getAddress()
  const secretPair = scriptBuilder.generateSecret(32)

  describe('hashTimelockContract', function () {
    it('should create HTLC locking script', function () {
      const secretHash = secretPair.hash.toString('hex')
      const locktime = 144
      assert.ok(scriptBuilder.hashTimelockContract(addr, addr, secretHash, locktime).toString('hex'))
    })
  })
})
