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

const { clone } = require('ramda')
const Buffer = require('safe-buffer').Buffer
const bitcoin = require('bitcoinjs-lib')
const bcrypto = bitcoin.crypto
const bscript = bitcoin.script
const baddress = bitcoin.address

const HASHTYPE = {
  SIGHASH_ALL: 0x01
}

const {
  bufferUInt8,
  bufferInt32,
  bufferUInt32,
  bufferUInt64,
  bufferVarInt,
  bufferVarSlice
} = require('tx-builder/src/buffer-build')
const {
  compose,
  prop,
  addProp
} = require('tx-builder/src/compose-build')
const {
  buildTxCopy,
  txCopyForHash,
  txCopySubscript,
  bufferInputs,
  bufferInput,
  // bufferOutput,
  bufferHash,
  vinScript,
  voutScript,
  bufferInputEmptyScript
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
    bufferInputs('vin'),                            // 1-9 bytes (VarInt), Input counter; Variable, Inputs
    prop('vout', mapConcatBuffers(bufferOutput)),   // 1-9 bytes (VarInt), Output counter; Variable, Outputs
    prop('locktime', bufferUInt32)                  // 4 bytes
  ])(tx, EMPTY_BUFFER)
)

// mapConcatBuffers :: Fn -> Array -> Buffer
const mapConcatBuffers = bufferFn => vins =>
(
  Buffer.concat(
    [bufferVarInt(vins.length)].concat(vins.map(bufferFn))
  )
)

// bufferOutput :: Object -> Buffer
const bufferOutput = vout =>
(
  compose([
    prop('value', bufferUInt64),               // 8 bytes, Amount in satoshis
    addProp(
      'scriptPubKey',
      prop('address', voutScript)
    ),
    prop('scriptPubKey', bufferVarSlice),      // 1-9 bytes (VarInt), Locking-Script Size; Variable, Locking-Script
    prop('equibit', buildEquibitData)
  ])(vout, EMPTY_BUFFER)
)

// buildEquibitData :: Object -> Buffer
const buildEquibitData = buffer =>
(
  compose([
    addProp('payment_currency', bufferUInt32),        // 0 - means no currency (for blank equibits) and 1 -- means BitCoin
    addProp('payment_tx_id', bufferHash),             // 256 bit hash (8 bytes) - should this be 32 bytes?
    addProp('payload', bufferVarSlice)                // JSON payload, var length slice
  ])({}, buffer)
)

module.exports = {
  buildTx,
  buildTxCopy,
  buildEquibitData,
  // txCopyForHash,
  // txCopySubscript,
  bufferOutput,
  // vinScript,
  // voutScript,
}