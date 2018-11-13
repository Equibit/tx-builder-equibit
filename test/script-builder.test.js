const assert = require('assert')
const bitcoin = require('bitcoinjs-lib')
const { getAddress } = require('tx-builder/src/utils')
const fixtureNode = require('./fixtures/hdnode')
const scriptBuilder = require('../src/script-builder')

const addrHdNode = fixtureNode.addrHdNode

describe('script-builder', function () {
  const { address } = getAddress(addrHdNode.publicKey, bitcoin.networks.testnet)
  const secretPair = scriptBuilder.generateSecret(32)

  describe('hashTimelockContract', function () {
    it('should create HTLC locking script', function () {
      const secretHash = secretPair.hash.toString('hex')
      const locktime = 144
      assert.ok(scriptBuilder.hashTimelockContract(address, address, secretHash, locktime).toString('hex'))
    })
  })
})
