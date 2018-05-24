/**
 * This constructs different redeem scripts.
 */
const typeforce = require('typeforce')
const types = require('tx-builder/src/types')
const randomBytes = require('randombytes')
const bitcoin = require('bitcoinjs-lib')
const scriptNumber = require('bitcoinjs-lib/src/script_number')
const bcrypto = bitcoin.crypto
const bscript = bitcoin.script
const baddress = bitcoin.address

const scripts = require('./script-templates')

const normalizeScript = script => script.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()

/**
 * Creates script for `scriptPubKey` field of a transaction output
 */
const hashTimelockContract = (redeemerAddr, funderAddr, commitment, locktime) => {
  typeforce(types.tuple(
    types.Address,
    types.Address,
    types.String,
    types.Number
  ), [redeemerAddr, funderAddr, commitment, locktime])
  if (locktime < 0) {
    throw new Error('Expected locktime to be a positive number')
  }

  const redeemerHex = baddress.fromBase58Check(redeemerAddr).hash.toString('hex')
  const funderHex = baddress.fromBase58Check(funderAddr).hash.toString('hex')
  const locktimeHex = scriptNumber.encode(locktime).toString('hex')

  const scriptAsm = normalizeScript(scripts.hashTimeLock(redeemerHex, funderHex, commitment, locktimeHex))
  // console.log(`scriptAsm = ${scriptAsm}`)
  const scriptPubKey = bscript.fromASM(scriptAsm)
  return scriptPubKey
}

// This is for testing a hashlock contract:
const simpleHashlockContract = (commitment) => {
  typeforce(types.String, commitment)

  const scriptAsm = normalizeScript(scripts.simpleHashLock(commitment))
  const scriptPubKey = bscript.fromASM(scriptAsm)
  return scriptPubKey
}
const simpleEqualContract = (value) => {
  typeforce(types.String, value)

  const scriptAsm = normalizeScript(scripts.simpleEqual(value))
  const scriptPubKey = bscript.fromASM(scriptAsm)
  return scriptPubKey
}

// This is for testing a contract with hashlock and address:
const simpleHashlockAddrContract = (redeemerAddr, commitment) => {
  typeforce(types.tuple(
    types.Address,
    types.String
  ), [redeemerAddr, commitment])

  const redeemerHex = baddress.fromBase58Check(redeemerAddr).hash.toString('hex')
  const scriptAsm = normalizeScript(scripts.simpleHashLockWithAddress(redeemerHex, commitment))
  const scriptPubKey = bscript.fromASM(scriptAsm)
  return scriptPubKey
}
const simpleHashlockSigContract = (redeemerAddr, commitment) => {
  typeforce(types.tuple(
    types.Address,
    types.String
  ), [redeemerAddr, commitment])

  const redeemerHex = baddress.fromBase58Check(redeemerAddr).hash.toString('hex')
  const scriptAsm = normalizeScript(scripts.simpleHashLockWithSig(redeemerHex, commitment))
  const scriptPubKey = bscript.fromASM(scriptAsm)
  return scriptPubKey
}

const generateSecret = (length) => {
  typeforce('Number', length)
  const secret = randomBytes(length)
  const hash = bcrypto.sha256(secret)
  return { secret, hash }
}

module.exports = {
  hashTimelockContract,
  simpleHashlockContract,
  simpleHashlockAddrContract,
  simpleHashlockSigContract,
  simpleEqualContract,
  generateSecret
}
