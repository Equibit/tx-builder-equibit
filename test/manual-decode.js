const varuint = require('varuint-bitcoin')
const Buffer = require('safe-buffer').Buffer
const fixtures = require('./fixtures/tx-hex')

const txHex = fixtures[0].hex
const buffer = Buffer.from(txHex, 'hex')
let offset = 0

const version = buffer.readInt32LE(offset)
console.log(`* version = ${version}, offset=${offset}, length=4`)
offset += 4

// VIN
const vinLen = varuint.decode(buffer, offset)
console.log(`* vinLen = ${vinLen}, offset=${offset}, length=${varuint.decode.bytes}`)
offset += varuint.decode.bytes

// VIN item:
const readVin = (buffer, offset) => {
  const hashReversed = buffer.slice(offset, offset + 32)
  const hash = Buffer.from(hashReversed, 'hex').reverse().toString('hex')
  console.log(`* hash = ${hash.toString('hex')}, offset=${offset}, length=32`)
  offset += 32

  const index = buffer.readUInt32LE(offset)
  console.log(`* index = ${index}, offset=${offset}, length=4`)
  offset += 4

  const scriptLen = varuint.decode(buffer, offset)
  console.log(`* scriptLen = ${scriptLen}, offset=${offset}, length=${varuint.decode.bytes}`)
  offset += varuint.decode.bytes

  const script = buffer.slice(offset, offset + scriptLen)
  console.log(`* script = ${script.toString('hex')}, offset=${offset}, length=${scriptLen}`)
  offset += scriptLen

  const sequence = buffer.readUInt32LE(offset)
  console.log(`* sequence = ${sequence}, offset=${offset}, length=4`)
  offset += 4

  return offset
}

console.log('--- VIN-1 ---')
offset = readVin(buffer, offset)
console.log('--- VIN-2 ---')
offset = readVin(buffer, offset)

// VOUT
const voutLen = varuint.decode(buffer, offset)
console.log(`* voutLen = ${voutLen}, offset=${offset}, length=${varuint.decode.bytes}`)
offset += varuint.decode.bytes

// VOUT item:
const readVout = (buffer, offset) => {
  const valueA = buffer.readUInt32LE(offset)
  const valueB = buffer.readUInt32LE(offset + 4)
  const valueBB = valueB * 0x100000000
  const value = valueA + valueBB
  console.log(`* value = ${value}, offset=${offset}, length=8`)
  offset += 8

  const lockingScriptLen = varuint.decode(buffer, offset)
  console.log(`* lockingScriptLen = ${lockingScriptLen}, offset=${offset}, length=${varuint.decode.bytes}`)
  offset += varuint.decode.bytes

  const lockingScript = buffer.slice(offset, offset + lockingScriptLen)
  console.log(`* lockingScript = ${lockingScript.toString('hex')}, offset=${offset}, length=${lockingScriptLen}`)
  offset += lockingScriptLen

  // equibit data:
  const payment_currency = buffer.readUInt32LE(offset)
  console.log(`* equibit.payment_currency = ${payment_currency}, offset=${offset}, length=4`)
  offset += 4

  const hashReversed = buffer.slice(offset, offset + 32)
  const payment_tx_id = Buffer.from(hashReversed, 'hex').reverse().toString('hex')
  console.log(`* equibit.payment_tx_id = ${payment_tx_id.toString('hex')}, offset=${offset}, length=32`)
  offset += 32

  const payloadLength = varuint.decode(buffer, offset)
  console.log(`* payloadLength = ${payloadLength}, offset=${offset}, length=${varuint.decode.bytes}`)
  offset += varuint.decode.bytes

  const payload = buffer.slice(offset, offset + payloadLength)
  console.log(`* payload = ${payload.toString()}, offset=${offset}, length=${varuint.decode.bytes}`)
  offset += payloadLength

  return offset
}

console.log('--- VOUT-1 ---')
offset = readVout(buffer, offset)
console.log('--- VOUT-2 ---')
offset = readVout(buffer, offset)

// Locktime
const locktime = buffer.readUInt32LE(offset)
console.log(`* locktime = ${locktime}, offset=${offset}, length=4`)
offset += 4

console.log(`BUFFER LEFT = ${buffer.slice(offset).toString('hex')}`)

// For fixtures:
console.log(`vout.0.equibit: ${buffer.slice(335, 372).toString('hex')}`)
console.log(`vout.1.equibit: ${buffer.slice(406, 1267).toString('hex')}`)
console.log(`vout.0: ${buffer.slice(301, 372).toString('hex')}`)
console.log(`vout.1: ${buffer.slice(372, 1267).toString('hex')}`)