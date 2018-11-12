const assert = require('assert')
const { getEquibitAddress } = require('../src/utils')
const eqbNetworks = require('../src/networks-equibit')

const fixtureNode = require('./fixtures/hdnode')
const scriptBuilder = require('../src/script-builder')

const addrHdNode = fixtureNode.addrHdNode

describe('script-builder', function () {
  const address = getEquibitAddress(addrHdNode.publicKey, eqbNetworks.testnet)
  const secretPair = scriptBuilder.generateSecret(32)

  describe('hashTimelockContract', function () {
    it('should create HTLC locking script', function () {
      const secretHash = secretPair.hash.toString('hex')
      const locktime = 144
      assert.ok(scriptBuilder.hashTimelockContract(address, address, secretHash, locktime).toString('hex'))
    })
  })
})
