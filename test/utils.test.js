const assert = require('assert')
const { getEquibitAddress } = require('../src/utils')
const eqbNetworks = require('../src/networks-equibit')

describe('Utils', function () {
  const pubKeyHexStr = ['03a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3', '0250863ad64a87ae8a2fe83c1af1a8403cb53f53e486d8511dad8a04887e5b2352', '028ef4f2028a6446bad7daefca6004eb8b13c1a9a0e88257e3a878becac24bb522']
  const exectedEQBAddressMainNet = ['EQa9KRkUkfxvKnnukYoUzJbGjDZFiVBS5Njp', 'EQaSAN2AgibLnmo9AHtb1MYEbRfFSDbUy5aQ', 'EQaM2X75QtyF7r1mhP1bg5kjEXBvNWVgaHnp']
  const expectedEQBAddressTestNet = ['TQaJyoNCGvMrZNWiyipKaVgLrPr3PESSf9cZ', 'TQabpjdtCxzH2MWxPTuRbYdJibx36xmnBm1T', 'TQaWgtinw9NBMRjavZ2SGGqoMhUi3FgB7RZ3']

  describe('getEquibitAddress (base58check public key hash)', function () {
    it('should return the expected value', function () {
      let pubKeyBufferHex

      for (let i = 0; i < 3; i++) {
        pubKeyBufferHex = Buffer.from(pubKeyHexStr[i], 'hex')

        // mainnet test
        const actualEQBAddressMainNet = getEquibitAddress(pubKeyBufferHex, eqbNetworks.equibit)
        assert.equal(actualEQBAddressMainNet, exectedEQBAddressMainNet[i])

        // testnet test
        const actualEQBAddressTestNet = getEquibitAddress(pubKeyBufferHex, eqbNetworks.testnet)
        assert.equal(actualEQBAddressTestNet, expectedEQBAddressTestNet[i])
      }
    })
  })
})
