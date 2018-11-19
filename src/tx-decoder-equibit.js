// const varuint = require('varuint-bitcoin')
const bitcoin = require('bitcoinjs-lib')
const { compose, addProp } = require('tx-builder/src/compose-read')
const { readInputs, readInput } = require('tx-builder/src/tx-decoder')
// const { readInputs, readInput, readHash } = require('tx-builder/src/tx-decoder')
const {
  // readSlice,
  readUInt32,
  readInt32,
  readUInt64,
  // readVarInt,
  readVarSlice
} = require('tx-builder/src/buffer-read')

// decodeTx :: Buffer -> [TxBuffer, Buffer]
const decodeTx = buffer =>
(
  compose([
    addProp('version', readInt32),            // 4 bytes
    addProp('vin', readInputs(readInput)),    // 1-9 bytes (VarInt), Input counter; Variable, Inputs
    addProp('vout', readInputs(readOutput)),  // 1-9 bytes (VarInt), Output counter; Variable, Outputs
    addProp('locktime', readUInt32)           // 4 bytes
  ])({}, buffer)
)

// readOutput :: Buffer -> [Res, Buffer]
const readOutput = buffer =>
(
  compose([
    addProp('value', readUInt64),            // 8 bytes, Amount in satoshis
    addProp('scriptPubKey', readScript)      // 1-9 bytes (VarInt), Locking-Script Size; Variable, Locking-Script
    // addProp('equibit', readEquibitData)
  ])({}, buffer)
)

const readScript = buffer => {
  const [ scriptBuffer, bufferLeft ] = readVarSlice(buffer)
  const decoded = {
    hex: scriptBuffer.toString('hex'),
    type: scriptBuffer[0] === bitcoin.opcodes.OP_DUP && scriptBuffer[1] === bitcoin.opcodes.OP_HASH160 ? 'pubkeyhash' : 'nonstandard'
  }

  // take bitcoin opcodes and reverse the keys and values to lookup ASM strings from int opcodes
  const codeops = Object.assign({}, ...Object.entries(bitcoin.opcodes).map(([ k, v ]) => ({ [v]: k })))

  // Currently this is identical to the implementation of bitcoinjs-lib's `bitcoin.script.toASM(buffer).
  // A separate implementation is desired so that if/when EQB implements new operations we can decode them ourselves.
  // Candidate for being added to a separate "override" repo if we need custom implementations of current bitcoin libraries.
  const asm = []
  for (let p = 0; p < scriptBuffer.length; p++) {
    const part = scriptBuffer[p]
    const hex = parseInt(part.toString(16), 16)
    if (hex < 0x02) {
      asm.push(codeops[part])
    } else if (hex >= 0x52 && hex <= 0x60) {
      asm.push(codeops[parseInt(hex - 0x50, 10)])
    } else if (hex >= 0x02 && hex <= 0x4b) {
      asm.push(scriptBuffer.slice(p + 1, p + part + 1).toString('hex'))
      p += part
    } else if (codeops[part]) {
      asm.push(codeops[part])
    } else throw new Error('unknown opcode ' + part)
  }
  decoded.asm = asm.join(' ')
  // Only P2PKH and P2PWPKH address decoding is supported
  decoded.addresses = [ bitcoin.address.fromOutputScript(scriptBuffer) ]

  return [ decoded, bufferLeft ]
}

// VOUT.equibit:
// payment_currency: a 32bit unsigned integer
// payment_tx_id: 256bit hash (8 bytes)
// payload: a string, its length is serialized first, and then its content

// readOutput :: Buffer -> [Res, Buffer]
// const readEquibitData = buffer =>
// (
//   compose([
//     addProp('payment_currency', readUInt32),        // 0 - means no currency (for blank equibits) and 1 -- means BitCoin
//     addProp('payment_tx_id', readVarSlice),         // std::vector<uint8_t>
//     addProp('issuance_tx_id', readHash),            // tx hash
//     addProp('issuance_json', readVarSlice)          //
//   ])({}, buffer)
// )

module.exports = {
  decodeTx,
  readInputs,
  readInput,
  readOutput
}
