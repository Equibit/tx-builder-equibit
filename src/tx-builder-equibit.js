// bitcoinjs-lib:
// const tx = new bitcoin.TransactionBuilder( network )
// tx.addInput( transactionHash, vout )
// tx.addOutput( scriptPubKey, value )
// tx.sign( vin, keyPair )
// tx.build().toHex()

/**
 * Equibit transaction:
 * - VIN is the same as in bitcoin tx
 * - VOUT: has extra fields:
 *    - payment_currency, Currency code
 *    - payment_tx_id, uint256
 *    - issuance_tx_id, uint256
 *    - payload, string
 */

const Buffer = require('safe-buffer').Buffer

const {
  // bufferUInt8,
  bufferInt32,
  bufferUInt32,
  bufferUInt64,
  // bufferVarInt,
  bufferVarSlice,
  mapConcatBuffers
} = require('tx-builder/src/buffer-build')
const {
  compose,
  prop,
  addProp
} = require('tx-builder/src/compose-build')
const {
  bufferInputs,
  makeBufferInput,
  makeBuildTxCopy,
  bufferHash,
  vinScript,
  voutScript
} = require('tx-builder/src/tx-builder')

const EMPTY_BUFFER = Buffer.allocUnsafe(0)

/**
 * Main function to build Equibit transaction.
 * @param {Object} tx
 * @return {Buffer}
 */
// buildTx :: Tx -> Buffer
const buildTx = tx =>
(
  compose([
    prop('version', bufferInt32),                   // 4 bytes
    bufferInputs('vin', bufferInput),               // 1-9 bytes (VarInt), Input counter; Variable, Inputs
    prop('vout', mapConcatBuffers(bufferOutput)),   // 1-9 bytes (VarInt), Output counter; Variable, Outputs
    prop('locktime', bufferUInt32)                  // 4 bytes
  ])(tx, EMPTY_BUFFER)
)

/**
 * Function bufferOutput is the main that implements equibit transaction structure difference.
 * @param vout
 */
// bufferOutput :: Object -> Buffer
const bufferOutput = vout =>
(
  compose([
    prop('value', bufferUInt64),                  // 8 bytes, Amount in satoshis
    addProp(
      'scriptPubKey',
      prop('address', voutScript)
    ),
    prop('scriptPubKey', bufferVarSlice('hex')),  // 1-9 bytes (VarInt), Locking-Script Size; Variable, Locking-Script
    prop('equibit', buildEquibitData)
  ])(vout, EMPTY_BUFFER)
)

// buildEquibitData :: Object -> Buffer
const buildEquibitData = equbitData =>
(
  compose([
    prop('payment_currency', bufferUInt32),        // 0 - means no currency (for blank equibits) and 1 -- means BitCoin
    prop('payment_tx_id', bufferHash),             // 256 bit hash (8 bytes) - should this be 32 bytes?
    prop('payload', bufferVarSlice('ascii'))       // JSON payload, var length slice
  ])(equbitData, EMPTY_BUFFER)
)

// Prepare reusable functions:
const buildTxCopy = makeBuildTxCopy(bufferOutput)
const bufferInput = makeBufferInput(buildTxCopy)

module.exports = {
  buildTx,
  buildTxCopy,
  buildEquibitData,
  bufferInputs,
  bufferInput,
  bufferOutput,
  vinScript
}
