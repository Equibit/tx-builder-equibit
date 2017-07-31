const varuint = require('varuint-bitcoin')
const { compose, addProp } = require('tx-decoder/src/compose')
const { readInputs, readInput } = require('tx-decoder/src/tx-decoder')
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
    // addProp('vout', readInputs(readOutput)),  // 1-9 bytes (VarInt), Output counter; Variable, Outputs
    // addProp('locktime', readUInt32)           // 4 bytes
  ])({}, buffer)
)

// readOutput :: Buffer -> [Res, Buffer]
const readOutput = buffer =>
(
  compose([
    addProp('value', readUInt64),             // 8 bytes, Amount in satoshis
    addProp('script', readVarSlice)           // 1-9 bytes (VarInt), Locking-Script Size; Variable, Locking-Script
  ])({}, buffer)
)

module.exports = {
  decodeTx,
  readInputs,
  readInput,
  readOutput
}
