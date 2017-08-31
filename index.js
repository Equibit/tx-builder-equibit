const decoder = require('./src/tx-decoder-equibit')
const builder = require('./src/tx-builder-equibit')
const { getTxId } = require('tx-builder/src/tx-decoder')

module.exports = {
  decoder,
  builder,
  getTxId
}
