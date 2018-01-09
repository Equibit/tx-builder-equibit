const decoder = require('./src/tx-decoder-equibit')
const builder = require('./src/tx-builder-equibit')
const { getTxId } = require('tx-builder/src/tx-decoder')
const {
  hashTimelockContract,
  generateSecret,
  simpleHashlockContract,
  simpleHashlockAddrContract,
  simpleHashlockSigContract
} = require('./src/script-builder')

module.exports = {
  decoder,
  builder,
  getTxId,
  hashTimelockContract,
  simpleHashlockContract,
  simpleHashlockAddrContract,
  simpleHashlockSigContract,
  generateSecret
}
