module.exports = [{
  title: 'SHA3 - EQB from coinbase',
  txid: '0252e23e5efbab816e2c7515246a470f7bdffdc373a9cf885180818697e7a119',
  hex: '02000000010000000000000000000000000000000000000000000000000000000000000000ffffffff03510101ffffffff020a299cd02a770000232103183de65f25cfbc5c371781dc212b46bca8db2de96d9076eef0a8c98ce0fd271eac00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000266a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf9000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  listunspent: {
    'txid': '0252e23e5efbab816e2c7515246a470f7bdffdc373a9cf885180818697e7a119',
    'vout': 0,
    'address': 'mgyFAKifcUPfmkY25LfLb8ckaNMP8JuvBL',
    'scriptPubKey': '2103183de65f25cfbc5c371781dc212b46bca8db2de96d9076eef0a8c98ce0fd271eac',
    'amount': 1310257.72226826,
    'confirmations': 101,
    'spendable': true,
    'solvable': true,
    'equibit': {
      'payment_currency': 0,
      'payment_tx_id': '',
      'issuance_tx_id': '0000000000000000000000000000000000000000000000000000000000000000',
      'issuance_json': ''
    }
  },
  decoded: {
    'txid': '0252e23e5efbab816e2c7515246a470f7bdffdc373a9cf885180818697e7a119',
    'hash': '0252e23e5efbab816e2c7515246a470f7bdffdc373a9cf885180818697e7a119',
    'size': 221,
    'vsize': 221,
    'version': 2,
    'locktime': 0,
    'vin': [
      {
        'coinbase': '510101',
        'sequence': 4294967295
      }
    ],
    'vout': [
      {
        'value': 1310257.72226826,
        'n': 0,
        'scriptPubKey': {
          'asm': '03183de65f25cfbc5c371781dc212b46bca8db2de96d9076eef0a8c98ce0fd271e OP_CHECKSIG',
          'hex': '2103183de65f25cfbc5c371781dc212b46bca8db2de96d9076eef0a8c98ce0fd271eac',
          'reqSigs': 1,
          'type': 'pubkey',
          'addresses': [
            'mgyFAKifcUPfmkY25LfLb8ckaNMP8JuvBL'
          ]
        },
        'equibit': {
          'payment_currency': 0,
          'payment_tx_id': '',
          'issuance_tx_id': '0000000000000000000000000000000000000000000000000000000000000000',
          'issuance_json': ''
        }
      },
      {
        'value': 0.00000000,
        'n': 1,
        'scriptPubKey': {
          'asm': 'OP_RETURN aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf9',
          'hex': '6a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf9',
          'type': 'nulldata'
        },
        'equibit': {
          'payment_currency': 0,
          'payment_tx_id': '',
          'issuance_tx_id': '0000000000000000000000000000000000000000000000000000000000000000',
          'issuance_json': ''
        }
      }
    ]
  },
  fromAddress: 'mgyFAKifcUPfmkY25LfLb8ckaNMP8JuvBL',
  privKey: 'cUtqnMnPdFJeg6fXknCH5XcHNqNz9amAYXDAD6S1XYehUiaVqJs3',
  tx: {},
  hexItems: {}
}, {
  title: 'SHA3 - EQB regular transaction',
  txid: '62c6fc127d8edbe839ddcf2e2531fa1912d0746476fa68a662bf7ec0a88465c6',
  hex: '020000000119a1e7978681805188cfa973c3fddf7b0f476a2415752c6e81abfb5e3ee2520200000000484730440220018e05a5e2415496b93f5d4d1d928e3f4836280e7cecf9660ca2d9cecaa6879202200187aa4ec83a2df5cf459a833be342c8926ba65b2448cb0871d9b68e051bdaa101feffffff029a61b5c12a7700001976a914bb0714d092afe38cca611791aaf076aba6aebc3788ac000000000000000000000000000000000000000000000000000000000000000000000000000080b2e60e000000001976a9140ff10539f75cb64a18f7283adb6ffa5ed8537f9888ac000000000000000000000000000000000000000000000000000000000000000000000000000065000000',
  decoded: {
    'txid': '62c6fc127d8edbe839ddcf2e2531fa1912d0746476fa68a662bf7ec0a88465c6',
    'hash': '62c6fc127d8edbe839ddcf2e2531fa1912d0746476fa68a662bf7ec0a88465c6',
    'size': 267,
    'vsize': 267,
    'version': 2,
    'locktime': 101,
    'vin': [
      {
        'txid': '0252e23e5efbab816e2c7515246a470f7bdffdc373a9cf885180818697e7a119',
        'vout': 0,
        'scriptSig': {
          'asm': '30440220018e05a5e2415496b93f5d4d1d928e3f4836280e7cecf9660ca2d9cecaa6879202200187aa4ec83a2df5cf459a833be342c8926ba65b2448cb0871d9b68e051bdaa1[ALL]',
          'hex': '4730440220018e05a5e2415496b93f5d4d1d928e3f4836280e7cecf9660ca2d9cecaa6879202200187aa4ec83a2df5cf459a833be342c8926ba65b2448cb0871d9b68e051bdaa101'
        },
        'sequence': 4294967294
      }
    ],
    'vout': [
      {
        'value': 1310255.22221466,
        'n': 0,
        'scriptPubKey': {
          'asm': 'OP_DUP OP_HASH160 bb0714d092afe38cca611791aaf076aba6aebc37 OP_EQUALVERIFY OP_CHECKSIG',
          'hex': '76a914bb0714d092afe38cca611791aaf076aba6aebc3788ac',
          'reqSigs': 1,
          'type': 'pubkeyhash',
          'addresses': [
            'mxZs8wiVXSD6myyRhLuLauyh8X8GFmbaLK'
          ]
        },
        'equibit': {
          'payment_currency': 0,
          'payment_tx_id': '',
          'issuance_tx_id': '0000000000000000000000000000000000000000000000000000000000000000',
          'issuance_json': ''
        }
      },
      {
        'value': 2.50000000,
        'n': 1,
        'scriptPubKey': {
          'asm': 'OP_DUP OP_HASH160 0ff10539f75cb64a18f7283adb6ffa5ed8537f98 OP_EQUALVERIFY OP_CHECKSIG',
          'hex': '76a9140ff10539f75cb64a18f7283adb6ffa5ed8537f9888ac',
          'reqSigs': 1,
          'type': 'pubkeyhash',
          'addresses': [
            'mgyFAKifcUPfmkY25LfLb8ckaNMP8JuvBL'
          ]
        },
        'equibit': {
          'payment_currency': 0,
          'payment_tx_id': '',
          'issuance_tx_id': '0000000000000000000000000000000000000000000000000000000000000000',
          'issuance_json': ''
        }
      }
    ]
  },
  fromAddress: '',
  privKey: '',
  tx: {},
  hexItems: {}
}]
