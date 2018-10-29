# tx-builder-equibit
Wallet EQB transaction builder

Here is what you need to do:

1. Checkout `tx-builder-equibit` repo.
2. Change the fixture data to your desired values:

https://github.com/Equibit/tx-builder-equibit/blob/master/test/fixtures/tx-sha3.js#L47
```
  tx: {
	    version: 2,
	    locktime: 0,
	    vin: [{
	      txid: 'a97e55574d69091e2e180d7769dad408df8611f02f3fdd6696bfd0ca90fcb6ec’,    <<< here
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
	  }
```

3. Change the test to run only your test:

https://github.com/Equibit/tx-builder-equibit/blob/master/test/tx-build.test.js#L110

Change
```
describe('P2PKH transaction (SHA3)', function () { … }
```

to
```
describe.only('P2PKH transaction (SHA3)', function () { … }
```

4. Run your test:
```
$ npm run test
```
