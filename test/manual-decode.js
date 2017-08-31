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
  console.log(`* txid = ${hash.toString('hex')}, offset=${offset}, length=32`)
  offset += 32

  const index = buffer.readUInt32LE(offset)
  console.log(`* vout index = ${index}, offset=${offset}, length=4`)
  offset += 4

  const scriptLen = varuint.decode(buffer, offset)
  console.log(`* scriptLen = ${scriptLen}, offset=${offset}, length=${varuint.decode.bytes}`)
  offset += varuint.decode.bytes

  const script = buffer.slice(offset, offset + scriptLen)
  console.log(`* script = ${script.toString('hex')}, offset=${offset}, length=${scriptLen}`)
  offset += scriptLen

  const sequence = buffer.readUInt32LE(offset)
  console.log(`* sequence = ${sequence}, offset=${offset}, length=4, hex=${buffer.slice(offset, offset + 4).toString('hex')}`)
  offset += 4

  return offset
}

for (let i = 0; i < vinLen; i++) {
  console.log(`--- VIN-${i} ---`)
  offset = readVin(buffer, offset)
}

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
  console.log(`** value buffer: ${buffer.slice(offset, offset + 8).toString('hex')}`)
  offset += 8

  const lockingScriptLen = varuint.decode(buffer, offset)
  console.log(`* lockingScriptLen = ${lockingScriptLen}, offset=${offset}, length=${varuint.decode.bytes}`)
  offset += varuint.decode.bytes

  const lockingScript = buffer.slice(offset, offset + lockingScriptLen)
  console.log(`* lockingScript = ${lockingScript.toString('hex')}, offset=${offset}, length=${lockingScriptLen}`)
  offset += lockingScriptLen

  // equibit data:
  const paymentCurrency = buffer.readUInt32LE(offset)
  console.log(`* equibit.payment_currency = ${paymentCurrency}, offset=${offset}, length=4`)
  offset += 4

  // const hashReversed = buffer.slice(offset, offset + 32)
  // const paymentTxId = Buffer.from(hashReversed, 'hex').reverse().toString('hex')
  // console.log(`* equibit.payment_tx_id = ${paymentTxId.toString('hex')}, offset=${offset}, length=32`)
  // offset += 32

  const paymentTxIdLength = varuint.decode(buffer, offset)
  console.log(`* equibit.paymentTxIdLength = ${paymentTxIdLength}, offset=${offset}, length=${varuint.decode.bytes}`)
  offset += varuint.decode.bytes
  const paymentTxId = buffer.slice(offset, offset + paymentTxIdLength).reverse().toString('hex')
  console.log(`* equibit.payment_tx_id = ${paymentTxId.toString('hex')}, offset=${offset}, length=${paymentTxIdLength}`)
  offset += paymentTxIdLength

  const hashReversed2 = buffer.slice(offset, offset + 32)
  const issuanceTxId = Buffer.from(hashReversed2, 'hex').reverse().toString('hex')
  console.log(`* equibit.issuance_tx_id = ${issuanceTxId.toString('hex')}, offset=${offset}, length=32`)
  offset += 32

  const payloadLength = varuint.decode(buffer, offset)
  console.log(`* equibit.payloadLength = ${payloadLength}, offset=${offset}, length=${varuint.decode.bytes}`)
  offset += varuint.decode.bytes
  const issuanceJson = buffer.slice(offset, offset + payloadLength)
  console.log(`* equibit.issuance_json = ${issuanceJson.toString()}, offset=${offset}, length=${payloadLength}`)
  offset += payloadLength

  return offset
}

for (let i = 0; i < voutLen; i++) {
  console.log(`--- VOUT-${i} ---`)
  offset = readVout(buffer, offset)
}

// Locktime
const locktime = buffer.readUInt32LE(offset)
console.log(`* locktime = ${locktime}, offset=${offset}, length=4`)
offset += 4

console.log(`BUFFER LEFT length = ${buffer.slice(offset).length}, ${buffer.slice(offset).toString('hex')}`)

// For fixtures:
console.log(`vin.0: ${buffer.slice(5, 119).toString('hex')}`)
console.log(`vin.1: ${buffer.slice(119, 233).toString('hex')}`)
console.log(`vin.2: ${buffer.slice(233, 347).toString('hex')}`)
console.log(`vout.0: ${buffer.slice(348, 420).toString('hex')}`)
console.log(`vout.1: ${buffer.slice(420, 492).toString('hex')}`)
console.log(`vout.0.equibit: ${buffer.slice(382, 420).toString('hex')}`)
console.log(`vout.1.equibit: ${buffer.slice(454, 492).toString('hex')}`)

/*
02000000

(VOUT)
02
(VIN.0:)
4be2ec9e985fa5a0ad788782c9a0eb42483d8bfdd3822b1961194792324db2b5
00000000
6b (script len `6b` = 107)
483045022100f95371c49709439009436d940c497b310bd676a5770da5116d4866c80fc2a18f022006c664a5a666c0de92c81d213b9370e33b83e249e0198b4591b0f73f060e6b08012103371677ea87d5fe03f25aacecfe417b4d8b1245c18e5e4cd8a1dfec38caf27439
feffffff (sequence)
(VIN.1:)
4be2ec9e985fa5a0ad788782c9a0eb42483d8bfdd3822b1961194792324db2b5
01000000
6b
483045022100b5e445384d3c5387d2b6c21ff0d47d4b44fbc0d8f7636ad49f0a08b2f7c068af02207fceae55d21eacbb353f804c9d5da396e7563bb62c675472609f3a96d9623230012102ffb8774d30c4d103665bfdcdfbf11fd6b7555c764a61b52f691078f9e05ef70e
feffffff

(VOUT)
02
(VOUT.0:)
7c26052a01000000 (value)
19 (scriptSig length `19` = 25)
76a914c91ba1f79b4d26aee81bf1975e8b482ab33ee13788ac
(VOUT.0.equibit:)
00000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
00
(VOUT.1:)
00f2052a01000000 (value)
19 (scriptSig len)
76a914d6ee070bf8e11408540b2e0814cdda65a39ff24088ac
(VOUT.1.equibit:)
00000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
fd38037b22636f6d70616e79223a7b22726567697374726174696f6e5f6e756d626572223a22542d313837352d3334352f3234222c226a7572697364696374696f6e5f636f756e747279223a22555341222c226a7572697364696374696f6e5f73746174655f6f725f70726f76696e6365223a224469737472696374206f6620436f6c756d626961222c226c6567616c5f6e616d65223a2249424d2043616e616461204c74642e222c2261646472657373223a223336303020537465656c6573204176652045617374222c2263697479223a224d61726b68616d222c2273746174655f6f725f70726f76696e6365223a224f6e746172696f222c227a69705f6f725f706f7374616c5f636f6465223a224c3352395a37222c22636f756e747279223a2243616e616461222c22776562223a2268747470733a2f2f7777772e69626d2e636f6d222c227075626c69635f6b65795f776562223a2268747470733a2f2f657175696269742e69626d2e636f6d222c22656d61696c223a22657175696269744069626d2e636f6d222c2270686f6e65223a222b31202839303529203331362d35303030227d2c2269737375616e6365223a7b2269737375616e63655f7075626c69635f6b6579223a22303235313934373733663464396133636438656139653031376436333464663939303434616238303734656638613036623538336436363633666230386635643638222c2269737375616e63655f6e616d65223a22696e697469616c2065717569626974207075626c6963206f66666572696e67222c2269737375616e63655f64617465223a313530313236353030372c227265737472696374696f6e5f6c6576656c223a302c2273656375726974795f74797065223a227072656665727265645f736861726573222c227072656665727265645f736861726573223a7b227061725f76616c7565223a3130302e31323334353637382c226469766964656e645f72617465223a31392e31322c2263756d756c6174697665223a302c226672657175656e6379223a332c2270617274696369706174696e67223a312c2272656465656d61626c65223a302c227265747261637461626c65223a312c22636f6e7665727469626c65223a3132337d7d7d
67000000

 */
