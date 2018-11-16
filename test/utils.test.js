const assert = require('assert')
const { getEquibitAddress } = require('../src/utils')
const eqbNetworks = require('../src/networks-equibit')

describe('Utils', function () {
  const pubKeyHexStrList = ['03a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3',
    '0250863ad64a87ae8a2fe83c1af1a8403cb53f53e486d8511dad8a04887e5b2352',
    '028ef4f2028a6446bad7daefca6004eb8b13c1a9a0e88257e3a878becac24bb522',
    '038ef445528a6446bad7daefzzz004eb8b13c1a9a0ezzz57e3a878bennnnnnb5az']

  const exectedEQBMainnetAddrList = ['EQaKcEiN29ZWFL35bepELuxKBdtUxvTPfpue', 'EQaLCaS8ocsUgRwnpcKHmcvBGX45y18xvVsj', 'EQaDMRaGzohRowRTzJ2gTwB2yg386zJkEjAt', 'EQaGEPifbkDbApFQindu8SKPn3SnBbL2LDFV']
  const expectedEQBTestnetAddrList = ['TQaVGcL5YPxSUuktppq4w73PJpBGdffJaaCj', 'TQaVrx3rKsGQv1fc3nL8Mp1FPhLsdkMbwGHb', 'TQaP1oBzX46N3X9HDU3X48G76rKumjaonMLY', 'TQaRtmLP7zcXQPyDwxejidQTuDjZrLTg3G8o']
  const eqbOptions = { sha: 'SHA3_256' }

  describe('getEquibitAddress using equibit network config, SHA3_256 hashing and base58Check', function () {
    it('should return the expected value', function () {
      let pubKeyBufferHex
      let pubKeyListLength = pubKeyHexStrList.length
      let actualEQBAddressMainNet, actualEQBAddressTestNet
      for (let i = 0; i < pubKeyListLength; i++) {
        pubKeyBufferHex = Buffer.from(pubKeyHexStrList[i], 'hex')

        // mainnet test
        actualEQBAddressMainNet = getEquibitAddress(pubKeyBufferHex, Object.assign(eqbOptions, { network: eqbNetworks.equibit }))
        assert.equal(actualEQBAddressMainNet, exectedEQBMainnetAddrList[i])

        // testnet test
        actualEQBAddressTestNet = getEquibitAddress(pubKeyBufferHex, Object.assign(eqbOptions, { network: eqbNetworks.testnet }))
        assert.equal(actualEQBAddressTestNet, expectedEQBTestnetAddrList[i])
      }
    })
  })
})
