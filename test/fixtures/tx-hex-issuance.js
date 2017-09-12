module.exports = [{
  hex: '020000000173fb8878b600113c24714b5b2c9ef70ae08e7f903b1afc6a75f387d9e75461e3000000006a473044022072601447d17f33f0300f199cd0b47f2284481c01c2447cb27ec4560114e1ea1e0220099ef750ede1450ab572612c8613cd6efbc5ae8f98d0f1cf3de62819ab805e5901210390f77df3f7ad66ee8405fdb3ab2f2b666943586b3ee73406dd9afcb6ec0c49fdfeffffff020065cd1d000000001976a914434bd190e022f14577c1e4cf6030437231f875e488ac00000000000000000000000000000000000000000000000000000000000000000000000000fd38037b22636f6d70616e79223a7b22726567697374726174696f6e5f6e756d626572223a22542d313837352d3334352f3234222c226a7572697364696374696f6e5f636f756e747279223a22555341222c226a7572697364696374696f6e5f73746174655f6f725f70726f76696e6365223a224469737472696374206f6620436f6c756d626961222c226c6567616c5f6e616d65223a2249424d2043616e616461204c74642e222c2261646472657373223a223336303020537465656c6573204176652045617374222c2263697479223a224d61726b68616d222c2273746174655f6f725f70726f76696e6365223a224f6e746172696f222c227a69705f6f725f706f7374616c5f636f6465223a224c3352395a37222c22636f756e747279223a2243616e616461222c22776562223a2268747470733a2f2f7777772e69626d2e636f6d222c227075626c69635f6b65795f776562223a2268747470733a2f2f657175696269742e69626d2e636f6d222c22656d61696c223a22657175696269744069626d2e636f6d222c2270686f6e65223a222b31202839303529203331362d35303030227d2c2269737375616e6365223a7b2269737375616e63655f7075626c69635f6b6579223a22303235313934373733663464396133636438656139653031376436333464663939303434616238303734656638613036623538336436363633666230386635643638222c2269737375616e63655f6e616d65223a22696e697469616c2065717569626974207075626c6963206f66666572696e67222c2269737375616e63655f64617465223a313530313236353030372c227265737472696374696f6e5f6c6576656c223a302c2273656375726974795f74797065223a227072656665727265645f736861726573222c227072656665727265645f736861726573223a7b227061725f76616c7565223a3130302e31323334353637382c226469766964656e645f72617465223a31392e31322c2263756d756c6174697665223a302c226672657175656e6379223a332c2270617274696369706174696e67223a312c2272656465656d61626c65223a302c227265747261637461626c65223a312c22636f6e7665727469626c65223a3132337d7d7df42bd717000000001976a914fc229014b49074b0c379c82ea40d443154dd08a388ac000000000000000000000000000000000000000000000000000000000000000000000000000067000000',
  decoded: {
    txid: '498336505ef677395b22298271f4a63e62282d56ddff2bc9c20fc6d34455c28f',
    hash: '498336505ef677395b22298271f4a63e62282d56ddff2bc9c20fc6d34455c28f',
    size: 1127,
    vsize: 1127,
    version: 2,
    locktime: 103,
    vin: [
      {
        txid: 'e36154e7d987f3756afc1a3b907f8ee00af79e2c5b4b71243c1100b67888fb73',
        vout: 0,
        scriptSig: {
          asm: '3044022072601447d17f33f0300f199cd0b47f2284481c01c2447cb27ec4560114e1ea1e0220099ef750ede1450ab572612c8613cd6efbc5ae8f98d0f1cf3de62819ab805e59[ALL] 0390f77df3f7ad66ee8405fdb3ab2f2b666943586b3ee73406dd9afcb6ec0c49fd',
          hex: '473044022072601447d17f33f0300f199cd0b47f2284481c01c2447cb27ec4560114e1ea1e0220099ef750ede1450ab572612c8613cd6efbc5ae8f98d0f1cf3de62819ab805e5901210390f77df3f7ad66ee8405fdb3ab2f2b666943586b3ee73406dd9afcb6ec0c49fd'
        },
        sequence: 4294967294
      }
    ],
    vout: [
      {
        value: 5,
        n: 0,
        scriptPubKey: {
          asm: 'OP_DUP OP_HASH160 434bd190e022f14577c1e4cf6030437231f875e4 OP_EQUALVERIFY OP_CHECKSIG',
          hex: '76a914434bd190e022f14577c1e4cf6030437231f875e488ac',
          reqSigs: 1,
          type: 'pubkeyhash',
          addresses: [
            'mmenPsnqw5CyqSNZumkphMEumgLzGbYD7m'
          ]
        },
        equibit: {
          payment_currency: 0,
          payment_tx_id: '',
          issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
          issuance_json: '{"company":{"registration_number":"T-1875-345/24","jurisdiction_country":"USA","jurisdiction_state_or_province":"District of Columbia","legal_name":"IBM Canada Ltd.","address":"3600 Steeles Ave East","city":"Markham","state_or_province":"Ontario","zip_or_postal_code":"L3R9Z7","country":"Canada","web":"https://www.ibm.com","public_key_web":"https://equibit.ibm.com","email":"equibit@ibm.com","phone":"+1 (905) 316-5000"},"issuance":{"issuance_public_key":"025194773f4d9a3cd8ea9e017d634df99044ab8074ef8a06b583d6663fb08f5d68","issuance_name":"initial equibit public offering","issuance_date":1501265007,"restriction_level":0,"security_type":"preferred_shares","preferred_shares":{"par_value":100.12345678,"dividend_rate":19.12,"cumulative":0,"frequency":3,"participating":1,"redeemable":0,"retractable":1,"convertible":123}}}'
        }
      },
      {
        value: 3.9997746,
        n: 1,
        scriptPubKey: {
          asm: 'OP_DUP OP_HASH160 fc229014b49074b0c379c82ea40d443154dd08a3 OP_EQUALVERIFY OP_CHECKSIG',
          hex: '76a914fc229014b49074b0c379c82ea40d443154dd08a388ac',
          reqSigs: 1,
          type: 'pubkeyhash',
          addresses: [
            'n4W7yrwUjWU1m3x2SBjPqm9ABEjXd2a4qN'
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
        txid: 'e36154e7d987f3756afc1a3b907f8ee00af79e2c5b4b71243c1100b67888fb73',
        vout: 0,
        scriptSig: '',
        sequence: 4294967294
      }
    ],
    vout: [
      {
        value: 5.00000000,
        address: 'mkRBGiKuV6bPywuoC24cbAq1imh5t5Ah1f',
        equibit: {
          payment_currency: 0,
          payment_tx_id: '',
          issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
          issuance_json: '{"company":{"registration_number":"T-1875-345/24","jurisdiction_country":"USA","jurisdiction_state_or_province":"District of Columbia","legal_name":"IBM Canada Ltd.","address":"3600 Steeles Ave East","city":"Markham","state_or_province":"Ontario","zip_or_postal_code":"L3R9Z7","country":"Canada","web":"https://www.ibm.com","public_key_web":"https://equibit.ibm.com","email":"equibit@ibm.com","phone":"+1 (905) 316-5000"},"issuance":{"issuance_public_key":"025194773f4d9a3cd8ea9e017d634df99044ab8074ef8a06b583d6663fb08f5d68","issuance_name":"initial equibit public offering","issuance_date":1501265007,"restriction_level":0,"security_type":"preferred_shares","preferred_shares":{"par_value":100.12345678,"dividend_rate":19.12,"cumulative":0,"frequency":3,"participating":1,"redeemable":0,"retractable":1,"convertible":123}}}'
        }
      },
      {
        value: 3.99977460,
        address: 'mkRBGiKuV6bPywuoC24cbAq1imh5t5Ah1f',
        equibit: {
          payment_currency: 0,
          payment_tx_id: '',
          issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
          issuance_json: ''
        }
      }
    ]
  }
}]
