module.exports = {
  equibit: {
    messagePrefix: '\x18Equibit Signed Message:\n',
    bech32: 'bc',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4
    },
    pubKeyHash: 0x01b5d1,
    scriptHash: 0x01b5fb,
    wif: 0x01b5ea
  },
  testnet: {
    messagePrefix: '\x18Equibit Signed Message:\n',
    bech32: 'tb',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394
    },
    pubKeyHash: 0x035e53,
    scriptHash: 0x035e88,
    wif: 0x035e75
  }
}
