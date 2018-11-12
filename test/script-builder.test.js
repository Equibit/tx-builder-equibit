const assert = require('assert')
const { getEquibitAddress } = require('../src/utils')
const eqbNetworks = require('../src/networks-equibit')

const fixtureNode = require('./fixtures/hdnode')
const scriptBuilder = require('../src/script-builder')

const addrHdNode = fixtureNode.addrHdNode

describe('script-builder', function () {
<<<<<<< HEAD
  const address = getAddress(addrHdNode.publicKey, { sha: 'SHA3_256', network: bitcoin.networks.testnet })
=======
  const address = getEquibitAddress(addrHdNode.publicKey, eqbNetworks.testnet)
>>>>>>> modify network and prefixes across repo
  const secretPair = scriptBuilder.generateSecret(32)

  it('should create HTLC locking script', function () {
    const secretHash = secretPair.hash.toString('hex')
    const locktime = 144
    assert.ok(scriptBuilder.hashTimelockContract(address, address, secretHash, locktime).toString('hex'))
  })
})
