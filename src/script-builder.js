/**
 * This constructs different redeem scripts.
 */
const typeforce = require('typeforce')
const types = require('tx-builder/src/types')
const randomBytes = require('randombytes')
const bitcoin = require('bitcoinjs-lib')
const bcrypto = bitcoin.crypto
const bscript = bitcoin.script
const baddress = bitcoin.address

const scripts = require('./script-templates')

const normalizeScript = script => script.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()

const hashTimelockContract = (redeemerAddr, funderAddr, commitment, locktime) => {
  typeforce(types.tuple(
    types.Address,
    types.Address,
    types.String,
    types.Number
  ), [redeemerAddr, funderAddr, commitment, locktime])

  const redeemerHex = baddress.fromBase58Check(redeemerAddr).hash.toString('hex')
  const funderHex = baddress.fromBase58Check(funderAddr).hash.toString('hex')

  const scriptAsm = normalizeScript(scripts.hashTimeLock(redeemerHex, funderHex, commitment, locktime))
  console.log(`scriptAsm = ${scriptAsm}`)
  const scriptSig = bscript.fromASM(scriptAsm)
  return scriptSig
}

const generateSecret = (length) => {
  typeforce('Number', length)
  const secret = randomBytes(length)
  const hash = bcrypto.sha256(secret)
  return { secret, hash }
}

module.exports = {
  hashTimelockContract,
  generateSecret
}
