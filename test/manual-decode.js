const varuint = require('varuint-bitcoin')
const Buffer = require('safe-buffer').Buffer
const fixtures = require('./fixtures')

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


// // VOUT
// const voutLen = varuint.decode(buffer, offset)
// offset += varuint.decode.bytes
//
// // VOUT-1
// const valueA = buffer.readUInt32LE(offset)
// const valueB = buffer.readUInt32LE(offset + 4)
// const valueBB = valueB * 0x100000000
// const value = valueA + valueBB
// offset += 8
//
// const lockingScriptLen = varuint.decode(buffer, offset)
// offset += varuint.decode.bytes
//
// const lockingScript = buffer.slice(offset, offset + lockingScriptLen)
// offset += lockingScriptLen
//
// // VOUT-2
// const valueA2 = buffer.readUInt32LE(offset)
// const valueB2 = buffer.readUInt32LE(offset + 4)
// const valueBB2 = valueB2 * 0x100000000
// const value2 = valueA2 + valueBB2
// offset += 8
//
// const lockingScriptLen2 = varuint.decode(buffer, offset)
// offset += varuint.decode.bytes
//
// const lockingScript2 = buffer.slice(offset, offset + lockingScriptLen2)
// offset += lockingScriptLen2
//
// // Locktime
// const locktime = buffer.readUInt32LE(offset)
// offset += 4
//
//
// console.log(`voutLen = ${voutLen}`)
// console.log(`valueA = ${valueA}`)
// console.log(`valueB = ${valueB}`)
// console.log(`valueB2 = ${valueBB}`)
// console.log(`value = ${value}`)
// console.log(`lockingScriptLen = ${lockingScriptLen}`)
// console.log(`lockingScript = ${lockingScript.toString('hex')}`)
// console.log(`value2 = ${value2}`)
// console.log(`lockingScriptLen2 = ${lockingScriptLen2}`)
// console.log(`lockingScriptLen2 = ${lockingScriptLen2}`)
// console.log(`lockingScript2 = ${lockingScript2.toString('hex')}`)
// console.log(`locktime = ${locktime}`)
//

console.log(`BUFFER LEFT = ${buffer.slice(offset).toString('hex')}`)