module.exports = {
  title: 'HTLC',
  hex: '',
  decoded: '',
  tx: {
    version: 2,
    locktime: 103,
    vin: [
      {
        txid: 'f59051c1170ecde117c3008f685b4c41a081d5b7457ae5aff479bcfd3435701f',
        vout: 0,
        script: '',
        sequence: 4294967294
      }
    ],
    vout: [
      {
        value: 1.4 * 100000000,
        hashSecret: '',
        receiverAddr: 'mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna', // #0
        refundAddr: 'mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt',   // #1
        locktime: 20
      }
    ]
  },
  hexItems: {}
}
