module.exports = [{
  title: 'SHA3 - eqb transaction',
  fromAddress: 'mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna',
  toAddress: 'mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt',
  utxoBalance: 3.0597367,
  hex: '0200000001ecb6fc90cad0bf9666dd3f2ff01186df08d4da69770d182e1e09694d57557ea9000000006a47304402206ad4a16fee766f06ad7f1b373c9aa62b978abc2c2fb44d24e12b58e4b4079a5d0220509cd2d4a6073e909bfb5ce6a36235d208b213270f014f271d386fbb4c51179d012103a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3feffffff01bec53c12000000001976a914bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab88ac000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  decoded: {
    'txid': 'a593f751fa070ff79e73c7f835127048514ef89827bd21c12f98483abbc36ad5',
    'hash': 'a593f751fa070ff79e73c7f835127048514ef89827bd21c12f98483abbc36ad5',
    'size': 229,
    'vsize': 229,
    'version': 2,
    'locktime': 0,
    'vin': [
      {
        'txid': 'a97e55574d69091e2e180d7769dad408df8611f02f3fdd6696bfd0ca90fcb6ec',
        'vout': 0,
        'scriptSig': {
          'asm': '304402206ad4a16fee766f06ad7f1b373c9aa62b978abc2c2fb44d24e12b58e4b4079a5d0220509cd2d4a6073e909bfb5ce6a36235d208b213270f014f271d386fbb4c51179d[ALL] 03a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3',
          'hex': '47304402206ad4a16fee766f06ad7f1b373c9aa62b978abc2c2fb44d24e12b58e4b4079a5d0220509cd2d4a6073e909bfb5ce6a36235d208b213270f014f271d386fbb4c51179d012103a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3'
        },
        'sequence': 4294967294
      }
    ],
    'vout': [
      {
        'value': 3.0597267,
        'n': 0,
        'scriptPubKey': {
          'asm': 'OP_DUP OP_HASH160 bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab OP_EQUALVERIFY OP_CHECKSIG',
          'hex': '76a914bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab88ac',
          'reqSigs': 1,
          'type': 'pubkeyhash',
          'addresses': [
            'mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt'
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
  tx: {
    version: 2,
    locktime: 0,
    vin: [{
      txid: 'a97e55574d69091e2e180d7769dad408df8611f02f3fdd6696bfd0ca90fcb6ec',
      vout: 0,
      script: '',
      sequence: 4294967294
    }],
    vout: [{
      value: (3.0597367 - 0.00001) * 100000000,
      address: 'mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt',
      equibit: {
        payment_currency: 0,
        payment_tx_id: '',
        issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
        issuance_json: ''
      }
    }]
  },
  hexItems: {}
}]
