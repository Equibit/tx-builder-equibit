module.exports = {
  title: 'HTLC',
  hex: '02000000011f703534fdbc79f4afe57a45b7d581a0414c5b688f00c317e1cd0e17c15190f5000000006a47304402205d239d0254b50cdb23b3568d5592d77107cd75fb77cda147f094486e8da3f0630220184fe4ebc206531ef4e700c4b016f8ab6fb017c5425efda69001d2dc9878a9c0012103a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3feffffff01003b5808000000005a63a8207c4222070fe4f287b70f12561fe93e703153d34cbc35bc3210ddd4eed609b0778876a9143c8710460fc63d27e6741dd1927f0ece41e9b555670120b17576a914bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab6888ac00000000',
  // hex: '02000000011f703534fdbc79f4afe57a45b7d581a0414c5b688f00c317e1cd0e17c15190f5000000006a473044022038cda256709756703e005e9e6c5ce331cb8fd0a5b8c9e59dc2f99160b051d10b02205179cf1245ae303a1f9ef833bb5b285a694e3fe875ee6c89cf68e30e29f6288e012103a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3feffffff01003b5808000000005a63a8207c4222070fe4f287b70f12561fe93e703153d34cbc35bc3210ddd4eed609b0778876a9143c8710460fc63d27e6741dd1927f0ece41e9b555670120b17576a914bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab6888ac000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  secret: '56c44dc6ac176bb534679a8e4b6979b1',
  secretHash: '7c4222070fe4f287b70f12561fe93e703153d34cbc35bc3210ddd4eed609b077',
  decoded: {
    'txid': '047b52385365da0394f1eb23fd96f6a4b4ad32741342e4bfaff3e34ac2efd78f',
    'hash': '047b52385365da0394f1eb23fd96f6a4b4ad32741342e4bfaff3e34ac2efd78f',
    'size': 294,
    'vsize': 294,
    'version': 2,
    'locktime': 0,
    'vin': [
      {
        'txid': 'f59051c1170ecde117c3008f685b4c41a081d5b7457ae5aff479bcfd3435701f',
        'vout': 0,
        'scriptSig': {
          'asm': '3044022038cda256709756703e005e9e6c5ce331cb8fd0a5b8c9e59dc2f99160b051d10b02205179cf1245ae303a1f9ef833bb5b285a694e3fe875ee6c89cf68e30e29f6288e[ALL] 03a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3',
          'hex': '473044022038cda256709756703e005e9e6c5ce331cb8fd0a5b8c9e59dc2f99160b051d10b02205179cf1245ae303a1f9ef833bb5b285a694e3fe875ee6c89cf68e30e29f6288e012103a6afa2211fc96a4130e767da4a9e802f5e922a151c5cd6d4bffa80358dd1f9a3'
        },
        'sequence': 4294967294
      }
    ],
    'vout': [
      {
        'value': 1.4,
        'n': 0,
        'scriptPubKey': {
          'asm': 'OP_IF OP_SHA256 7c4222070fe4f287b70f12561fe93e703153d34cbc35bc3210ddd4eed609b077 OP_EQUALVERIFY OP_DUP OP_HASH160 3c8710460fc63d27e6741dd1927f0ece41e9b555 OP_ELSE 32 OP_CHECKLOCKTIMEVERIFY OP_DROP OP_DUP OP_HASH160 bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab OP_ENDIF OP_EQUALVERIFY OP_CHECKSIG',
          'hex': '63a8207c4222070fe4f287b70f12561fe93e703153d34cbc35bc3210ddd4eed609b0778876a9143c8710460fc63d27e6741dd1927f0ece41e9b555670120b17576a914bcf5f8cbef57fb5d1794eb626a7752e31d1b2aab6888ac',
          'type': 'nonstandard'
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
      txid: 'f59051c1170ecde117c3008f685b4c41a081d5b7457ae5aff479bcfd3435701f',
      vout: 0,
      script: '',
      sequence: 4294967294
    }],
    vout: [{
      value: 1.4 * 100000000,
      hashSecret: '',
      receiverAddr: 'mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna', // #0
      refundAddr: 'mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt',   // #1
      locktime: 32,
      equibit: {
        payment_currency: 0,
        payment_tx_id: '',
        issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
        issuance_json: ''
      }
    }]
  },
  hexItems: {}
}
