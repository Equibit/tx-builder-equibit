const varuint = require('varuint-bitcoin')
const Buffer = require('safe-buffer').Buffer

function manualDecode (buffer) {
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
}

module.exports = manualDecode
