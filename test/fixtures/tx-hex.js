module.exports = [{
  title: 'Blank EQB',
  hex: '02000000031f703534fdbc79f4afe57a45b7d581a0414c5b688f00c317e1cd0e17c15190f500000000494830450221008dea94a516ec6dc24af3ba31d10c385b024389728dcf086c1dc4bb67ecbc7a5d02201a8bf70aba2aea1917caec3bf384f7bba186c2f3c9da516ab1078f21688f3b3401feffffff5ad743d788f5f8a1fd553019f783df348f1c170dc1a1f2584cd6092845e6d22700000000494830450221009bec4f2cfbab16479be137e89b80a8b3093324afa0c50ae0987f2ca88a2c54e50220710e5511a998ab5608c90765da711f43bc0792af6bca3bceef443c20f92e4fac01feffffff6c17de25295962f995c307d87f8d146ae15b2195253dc6f69a185ddb73d82d9c0000000049483045022100c2cf02900b435c3309baa3d8743b1e3ceef9c6574a4a9b216ac0afde5fe14ab8022066a3245cf1f3e2e699bc8e05179968e0f29756787b6d2e7677c2c895beafa52501feffffff0200e9a435000000001976a91435c0f7388199877965a2e1c322a58f984a3edce388ac000000000000000000000000000000000000000000000000000000000000000000000000000041b70301000000001976a914b648c11bab8109c8ebcc008a5815faa2250a1ea388ac000000000000000000000000000000000000000000000000000000000000000000000000000067000000',
  offsetVout: 300,
  decoded: {
    txid: 'e36154e7d987f3756afc1a3b907f8ee00af79e2c5b4b71243c1100b67888fb73',
    hash: 'e36154e7d987f3756afc1a3b907f8ee00af79e2c5b4b71243c1100b67888fb73',
    size: 496,
    vsize: 496,
    version: 2,
    locktime: 103,
    vin: [
      {
        txid: 'f59051c1170ecde117c3008f685b4c41a081d5b7457ae5aff479bcfd3435701f',
        vout: 0,
        scriptSig: {
          asm: '30450221008dea94a516ec6dc24af3ba31d10c385b024389728dcf086c1dc4bb67ecbc7a5d02201a8bf70aba2aea1917caec3bf384f7bba186c2f3c9da516ab1078f21688f3b34[ALL]',
          hex: '4830450221008dea94a516ec6dc24af3ba31d10c385b024389728dcf086c1dc4bb67ecbc7a5d02201a8bf70aba2aea1917caec3bf384f7bba186c2f3c9da516ab1078f21688f3b3401'
        },
        sequence: 4294967294
      },
      {
        txid: '27d2e6452809d64c58f2a1c10d171c8f34df83f7193055fda1f8f588d743d75a',
        vout: 0,
        scriptSig: {
          asm: '30450221009bec4f2cfbab16479be137e89b80a8b3093324afa0c50ae0987f2ca88a2c54e50220710e5511a998ab5608c90765da711f43bc0792af6bca3bceef443c20f92e4fac[ALL]',
          hex: '4830450221009bec4f2cfbab16479be137e89b80a8b3093324afa0c50ae0987f2ca88a2c54e50220710e5511a998ab5608c90765da711f43bc0792af6bca3bceef443c20f92e4fac01'
        },
        sequence: 4294967294
      },
      {
        txid: '9c2dd873db5d189af6c63d2595215be16a148d7fd807c395f962592925de176c',
        vout: 0,
        scriptSig: {
          asm: '3045022100c2cf02900b435c3309baa3d8743b1e3ceef9c6574a4a9b216ac0afde5fe14ab8022066a3245cf1f3e2e699bc8e05179968e0f29756787b6d2e7677c2c895beafa525[ALL]',
          hex: '483045022100c2cf02900b435c3309baa3d8743b1e3ceef9c6574a4a9b216ac0afde5fe14ab8022066a3245cf1f3e2e699bc8e05179968e0f29756787b6d2e7677c2c895beafa52501'
        },
        sequence: 4294967294
      }
    ],
    vout: [
      {
        value: 9 * 100000000,
        n: 0,
        scriptPubKey: {
          asm: 'OP_DUP OP_HASH160 35c0f7388199877965a2e1c322a58f984a3edce3 OP_EQUALVERIFY OP_CHECKSIG',
          hex: '76a91435c0f7388199877965a2e1c322a58f984a3edce388ac',
          reqSigs: 1,
          type: 'pubkeyhash',
          addresses: [
            'mkRBGiKuV6bPywuoC24cbAq1imh5t5Ah1f'
          ]
        },
        equibit: {
          payment_currency: 0,
          payment_tx_id: '',
          issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
          issuance_json: ''
        }
      },
      {
        value: 0.17020737 * 100000000,
        n: 1,
        scriptPubKey: {
          asm: 'OP_DUP OP_HASH160 b648c11bab8109c8ebcc008a5815faa2250a1ea3 OP_EQUALVERIFY OP_CHECKSIG',
          hex: '76a914b648c11bab8109c8ebcc008a5815faa2250a1ea388ac',
          reqSigs: 1,
          type: 'pubkeyhash',
          addresses: [
            'mx8nS2VU1wWsYZhkZKQZDqZUc7k4AYBWBU'
          ]
        },
        equibit: {
          payment_currency: 0,
          payment_tx_id: '',
          issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
          issuance_json: ''
        }
      }
    ]
  },
  tx: {
    version: 2,
    locktime: 103,
    vin: [
      {
        txid: 'f59051c1170ecde117c3008f685b4c41a081d5b7457ae5aff479bcfd3435701f',
        index: 0,
        script: '',
        sequence: 4294967294
      },
      {
        txid: '27d2e6452809d64c58f2a1c10d171c8f34df83f7193055fda1f8f588d743d75a',
        index: 0,
        script: '',
        sequence: 4294967294
      },
      {
        txid: '9c2dd873db5d189af6c63d2595215be16a148d7fd807c395f962592925de176c',
        index: 0,
        scriptSig: '',
        sequence: 4294967294
      }
    ],
    vout: [
      {
        value: 9 * 100000000,
        address: 'mkRBGiKuV6bPywuoC24cbAq1imh5t5Ah1f',
        equibit: {
          payment_currency: 0,
          payment_tx_id: '',
          issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
          issuance_json: ''
        }
      },
      {
        value: 0.17020737 * 100000000,
        address: 'mx8nS2VU1wWsYZhkZKQZDqZUc7k4AYBWBU',
        equibit: {
          payment_currency: 0,
          payment_tx_id: '',
          issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
          issuance_json: ''
        }
      }
    ]
  },
  hexItems: {
    vin: [{
      hex: '1f703534fdbc79f4afe57a45b7d581a0414c5b688f00c317e1cd0e17c15190f500000000494830450221008dea94a516ec6dc24af3ba31d10c385b024389728dcf086c1dc4bb67ecbc7a5d02201a8bf70aba2aea1917caec3bf384f7bba186c2f3c9da516ab1078f21688f3b3401feffffff'
    }, {
      offset: 119,
      hex: '5ad743d788f5f8a1fd553019f783df348f1c170dc1a1f2584cd6092845e6d22700000000494830450221009bec4f2cfbab16479be137e89b80a8b3093324afa0c50ae0987f2ca88a2c54e50220710e5511a998ab5608c90765da711f43bc0792af6bca3bceef443c20f92e4fac01feffffff'
    }, {
      offset: 233,
      hex: '6c17de25295962f995c307d87f8d146ae15b2195253dc6f69a185ddb73d82d9c0000000049483045022100c2cf02900b435c3309baa3d8743b1e3ceef9c6574a4a9b216ac0afde5fe14ab8022066a3245cf1f3e2e699bc8e05179968e0f29756787b6d2e7677c2c895beafa52501feffffff'
    }],
    voutOffset: 347,
    vout: [{
      hex: '00e9a435000000001976a91435c0f7388199877965a2e1c322a58f984a3edce388ac0000000000000000000000000000000000000000000000000000000000000000000000000000',
      equibit: {
        hex: '0000000000000000000000000000000000000000000000000000000000000000000000000000'
      }
    }, {
      hex: '41b70301000000001976a914b648c11bab8109c8ebcc008a5815faa2250a1ea388ac0000000000000000000000000000000000000000000000000000000000000000000000000000',
      equibit: {
        hex: '0000000000000000000000000000000000000000000000000000000000000000000000000000'
      }
    }]
  }
}]
