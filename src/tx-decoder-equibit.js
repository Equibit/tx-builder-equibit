const varuint = require('varuint-bitcoin')
const { compose, addProp } = require('tx-decoder/src/compose')
const { readInputs, readInput, readHash } = require('tx-decoder/src/tx-decoder')
const {
  readSlice,
  readUInt32,
  readInt32,
  readUInt64,
  readVarInt,
  readVarSlice
} = require('tx-decoder/src/buffer-utils')

// decodeTx :: buffer -> [vin, buffer]
const decodeTx = buffer =>
(
  compose([
    addProp('version', readInt32),            // 4 bytes
    addProp('vin', readInputs(readInput)),    // 1-9 bytes (VarInt), Input counter; Variable, Inputs
    addProp('vout', readInputs(readOutput)),  // 1-9 bytes (VarInt), Output counter; Variable, Outputs
    addProp('locktime', readUInt32)           // 4 bytes
  ])({}, buffer)
)

// VOUT.equibit:
// payment_currency: a 32bit unsigned integer
// payment_tx_id: 256bit hash (8 bytes)
// payload: a string, its length is serialized first, and then its content

// readOutput :: Buffer -> [Res, Buffer]
const readEquibitData = buffer =>
  (
    compose([
      addProp('payment_currency', readUInt32),        // 0 - means no currency (for blank equibits) and 1 -- means BitCoin
      addProp('payment_tx_id', readHash),             // 256 bit hash (8 bytes) - should this be 32 bytes?
      addProp('payload', readVarSlice)                //
    ])({}, buffer)
  )

// readOutput :: Buffer -> [Res, Buffer]
const readOutput = buffer =>
(
  compose([
    addProp('value', readUInt64),             // 8 bytes, Amount in satoshis
    addProp('script', readVarSlice),          // 1-9 bytes (VarInt), Locking-Script Size; Variable, Locking-Script
    addProp('equibit', readEquibitData)       //
  ])({}, buffer)
)

module.exports = {
  decodeTx,
  readInputs,
  readInput,
  readOutput
}
