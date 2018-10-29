module.exports = [{
  title: 'SHA3 - eqb transaction',
  fromAddress: 'mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna',
  toAddress: 'mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt',
  utxoBalance: 3.0597367,
  hex: '0200000001ecb6fc90cad0bf9666dd3f2ff01186df08d4da69770d182e1e09694d57557ea9000000006a4730440220438b987a5cfff167c3890b10981cd85776f1a333b4e9aff08c161f94f3befdaa02207114918f4c63dc352d2a3a43e1432b5d6603b48ff638e437c04ed04e1d6a07bc012103a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3feffffff01bec53c12000000001976a914bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab88ac00000000',
  // hex: '0200000001ecb6fc90cad0bf9666dd3f2ff01186df08d4da69770d182e1e09694d57557ea9000000006a47304402206ad4a16fee766f06ad7f1b373c9aa62b978abc2c2fb44d24e12b58e4b4079a5d0220509cd2d4a6073e909bfb5ce6a36235d208b213270f014f271d386fbb4c51179d012103a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3feffffff01bec53c12000000001976a914bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab88ac000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
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
        }
        // 'equibit': {
        //   'payment_currency': 0,
        //   'payment_tx_id': '',
        //   'issuance_tx_id': '0000000000000000000000000000000000000000000000000000000000000000',
        //   'issuance_json': ''
        // }
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
      address: 'mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt'
      // equibit: {
      //   payment_currency: 0,
      //   payment_tx_id: '',
      //   issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
      //   issuance_json: ''
      // }
    }]
  },
  hexItems: {}
}, {
  title: 'SHA3 - HTLC locking transaction',
  secret: '56c44dc6ac176bb534679a8e4b6979b1',
  secretHash: '7c4222070fe4f287b70f12561fe93e703153d34cbc35bc3210ddd4eed609b077',
  fromAddress: 'mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna',
  toAddress: 'mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt',
  utxoBalance: 3.06199412,
  hex: '020000000100d45cc267f4bd03332575067f17345bd5a8039e406c5e76ae3a40c80a39d778000000006a4730440220254951670b7443d9a118812f21f9470e26f63545f859f0ea247529b3f2f954f20220200a5891e7527a78b21eaa979ade0db3b336a26e2337d2c49687b47c2ad3310f012103a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3feffffff018c374012000000005a63a8207c4222070fe4f287b70f12561fe93e703153d34cbc35bc3210ddd4eed609b0778876a914bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab670120b17576a9143c8710460fc63d27e6741dd1927f0ece41e9b5556888ac00000000',
  // hex: '020000000100d45cc267f4bd03332575067f17345bd5a8039e406c5e76ae3a40c80a39d778000000006a47304402201521bdf0bc00197105e00b869dc593d645a70cb3b8c46ef6d508cffc534700ed022077d9ae9055a26f03aa9562052e6c6f8a7c52e4aa8a4757604486cf805c12b134012103a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3feffffff018c374012000000005a63a8207c4222070fe4f287b70f12561fe93e703153d34cbc35bc3210ddd4eed609b0778876a914bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab670120b17576a9143c8710460fc63d27e6741dd1927f0ece41e9b5556888ac000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  decoded: {
    'txid': '27edba29b56bd9411c380340ab36a6a1f18b1ce9198859b0ef5509478c838a55',
    'hash': '27edba29b56bd9411c380340ab36a6a1f18b1ce9198859b0ef5509478c838a55',
    'size': 294,
    'vsize': 294,
    'version': 2,
    'locktime': 0,
    'vin': [
      {
        'txid': '78d7390ac8403aae765e6c409e03a8d55b34177f0675253303bdf467c25cd400',
        'vout': 0,
        'scriptSig': {
          'asm': '304402201521bdf0bc00197105e00b869dc593d645a70cb3b8c46ef6d508cffc534700ed022077d9ae9055a26f03aa9562052e6c6f8a7c52e4aa8a4757604486cf805c12b134[ALL] 03a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3',
          'hex': '47304402201521bdf0bc00197105e00b869dc593d645a70cb3b8c46ef6d508cffc534700ed022077d9ae9055a26f03aa9562052e6c6f8a7c52e4aa8a4757604486cf805c12b134012103a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3'
        },
        'sequence': 4294967294
      }
    ],
    'vout': [
      {
        'value': 3.06198412,
        'n': 0,
        'scriptPubKey': {
          'asm': 'OP_IF OP_SHA256 7c4222070fe4f287b70f12561fe93e703153d34cbc35bc3210ddd4eed609b077 OP_EQUALVERIFY OP_DUP OP_HASH160 bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab OP_ELSE 32 OP_CHECKLOCKTIMEVERIFY OP_DROP OP_DUP OP_HASH160 3c8710460fc63d27e6741dd1927f0ece41e9b555 OP_ENDIF OP_EQUALVERIFY OP_CHECKSIG',
          'hex': '63a8207c4222070fe4f287b70f12561fe93e703153d34cbc35bc3210ddd4eed609b0778876a914bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab670120b17576a9143c8710460fc63d27e6741dd1927f0ece41e9b5556888ac',
          'type': 'nonstandard'
        }
        // 'equibit': {
        //   'payment_currency': 0,
        //   'payment_tx_id': '',
        //   'issuance_tx_id': '0000000000000000000000000000000000000000000000000000000000000000',
        //   'issuance_json': ''
        // }
      }
    ]
  },
  tx: {
    version: 2,
    locktime: 0,
    vin: [{
      txid: '78d7390ac8403aae765e6c409e03a8d55b34177f0675253303bdf467c25cd400',
      vout: 0,
      script: '',
      sequence: 4294967294
    }],
    vout: [{
      value: (3.06199412 - 0.00001) * 100000000,
      address: 'mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt',
      hashSecret: '',
      receiverAddr: 'mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt', // #1
      refundAddr: 'mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna',   // #0
      locktime: 32
      // equibit: {
      //   payment_currency: 0,
      //   payment_tx_id: '',
      //   issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
      //   issuance_json: ''
      // }
    }]
  }
}, {
  title: 'SHA3 - HTLC UNlocking transaction',
  secret: '56c44dc6ac176bb534679a8e4b6979b1',
  secretHash: '7c4222070fe4f287b70f12561fe93e703153d34cbc35bc3210ddd4eed609b077',
  hex: '0200000001558a838c470955efb0598819e91c8bf1a1a636ab4003381c41d96bb529baed27000000007d483045022100ce8dd37bf25aea145e55b130f1f16187061ca7d3bec6bf295de77d6df7ea436e02204c0bb49aff9d0ea00ae98e1318fb42420874c2b29a82668d1a28ca8c0af20cda0121028ef4f2028a6446bad7daefca6004eb8b13c1a9a0e88257e3a878becac24bb5221056c44dc6ac176bb534679a8e4b6979b151feffffff018c374012000000001976a914bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab88ac00000000',
  // hex: '0200000001558a838c470955efb0598819e91c8bf1a1a636ab4003381c41d96bb529baed27000000007c47304402207363b55bc914a9e3b6643a3464cce055dd7e07a11b91b0c61baa5fe7886085c902201e63132df64d648be12ea50f650883a469dfec9438df46c76396dd0ab4ee59d80121028ef4f2028a6446bad7daefca6004eb8b13c1a9a0e88257e3a878becac24bb5221056c44dc6ac176bb534679a8e4b6979b151feffffff018c374012000000001976a914bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab88ac000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  decoded: {
    'txid': '7cbf0b9ee390b580f5b008da18453735ae7a6ee3ba2619a9beacd2b6374b6475',
    'hash': '7cbf0b9ee390b580f5b008da18453735ae7a6ee3ba2619a9beacd2b6374b6475',
    'size': 247,
    'vsize': 247,
    'version': 2,
    'locktime': 0,
    'vin': [
      {
        'txid': '27edba29b56bd9411c380340ab36a6a1f18b1ce9198859b0ef5509478c838a55',
        'vout': 0,
        'scriptSig': {
          'asm': '304402207363b55bc914a9e3b6643a3464cce055dd7e07a11b91b0c61baa5fe7886085c902201e63132df64d648be12ea50f650883a469dfec9438df46c76396dd0ab4ee59d8[ALL] 028ef4f2028a6446bad7daefca6004eb8b13c1a9a0e88257e3a878becac24bb522 56c44dc6ac176bb534679a8e4b6979b1 1',
          'hex': '47304402207363b55bc914a9e3b6643a3464cce055dd7e07a11b91b0c61baa5fe7886085c902201e63132df64d648be12ea50f650883a469dfec9438df46c76396dd0ab4ee59d80121028ef4f2028a6446bad7daefca6004eb8b13c1a9a0e88257e3a878becac24bb5221056c44dc6ac176bb534679a8e4b6979b151'
        },
        'sequence': 4294967294
      }
    ],
    'vout': [
      {
        'value': 3.06198412,
        'n': 0,
        'scriptPubKey': {
          'asm': 'OP_DUP OP_HASH160 bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab OP_EQUALVERIFY OP_CHECKSIG',
          'hex': '76a914bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab88ac',
          'reqSigs': 1,
          'type': 'pubkeyhash',
          'addresses': [
            'mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt'
          ]
        }
        // 'equibit': {
        //   'payment_currency': 0,
        //   'payment_tx_id': '',
        //   'issuance_tx_id': '0000000000000000000000000000000000000000000000000000000000000000',
        //   'issuance_json': ''
        // }
      }
    ]
  },
  tx: {
    version: 2,
    locktime: 0,
    vin: [{
      txid: '27edba29b56bd9411c380340ab36a6a1f18b1ce9198859b0ef5509478c838a55',
      vout: 0,
      script: '',
      sequence: 4294967294,
      htlc: {
        secret: '56c44dc6ac176bb534679a8e4b6979b1',
        receiverAddr: 'mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt', // #1
        refundAddr: 'mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna',   // #0
        timelock: 32
      }
    }],
    vout: [{
      value: 3.06198412 * 100000000,
      address: 'mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt'
      // equibit: {
      //   payment_currency: 0,
      //   payment_tx_id: '',
      //   issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
      //   issuance_json: ''
      // }
    }]
  }
}]
