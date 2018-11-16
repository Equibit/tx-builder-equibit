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

const Buffer = require('safe-buffer').Buffer
const typeforce = require('typeforce')
const types = require('tx-builder/src/types')

const {
  // bufferUInt8,
  bufferInt32,
  bufferUInt32,
  bufferUInt64,
  // bufferVarInt,
  bufferVarSlice,
  mapConcatBuffers
} = require('tx-builder/src/buffer-build')
const {
  compose,
  prop,
  addProp,
  iff,
  hasNo
} = require('tx-builder/src/compose-build')
const {
  bufferInputs,
  makeBufferInput,
  makeBuildTxCopy,
  bufferHash,
  vinScript
} = require('tx-builder/src/tx-builder')
const { voutScriptEqb } = require('./utils')
const hashTimelockContract = require('./script-builder').hashTimelockContract

const EMPTY_BUFFER = Buffer.allocUnsafe(0)

const log = msg => obj => {
  console.log(`LOG::: msg`, obj)
  return EMPTY_BUFFER
}

/**
 * Main function to build Equibit transaction.
 * @param {Object} tx
 * @param {Object} options
 * @return {Buffer}
 *
 * ```
 * const txConfig = { version: 1, vin: [...]}
 * const options = {
 *    network: bitcoin.networks.testnet   // or `bitcoin.networks.bitcoin` for mainnet.
 *    sha: 'SHA3'                         // ('SHA256' | 'SHA3' | Fn)
 * }
 * ```
 */
// buildTx :: (Tx, Options) -> Buffer
const buildTx = (tx, options) => {
  options = Object.assign({ hashTimelockContract }, options)
  typeforce(types.TxConfig, tx)
  typeforce(types.TxBuilderOptions, options)

  return compose([
    prop('version', bufferInt32),                   // 4 bytes
    bufferInputs('vin', bufferInputEqb(options)),               // 1-9 bytes (VarInt), Input counter; Variable, Inputs
    prop('vout', mapConcatBuffers(bufferOutputEqb(options))),   // 1-9 bytes (VarInt), Output counter; Variable, Outputs
    prop('locktime', bufferUInt32)                  // 4 bytes
  ])(tx, EMPTY_BUFFER)
}

/**
 * Function bufferOutputEqb is the main that implements equibit transaction structure difference.
 * @param vout
 */
// bufferOutputEqb :: Options -> (Object -> Buffer)
const bufferOutputEqb = options => vout => {
  typeforce({
    value: 'Number',
    address: typeforce.maybe('String')
    // equibit: 'Object'
  }, vout)
  return compose([
    prop('value', bufferUInt64),                  // 8 bytes, Amount in satoshis
    iff(
      hasNo('scriptPubKey'),
      addProp(
        'scriptPubKey',
        prop('address', voutScriptEqb(options))
      )
    ),
    prop('scriptPubKey', bufferVarSlice('hex'))  // 1-9 bytes (VarInt), Locking-Script Size; Variable, Locking-Script
    // prop('equibit', buildEquibitData)
  ])(vout, EMPTY_BUFFER)
}

// buildEquibitData :: Object -> Buffer
const buildEquibitData = equbitData => {
  typeforce({
    payment_currency: 'Number',
    payment_tx_id: 'String',
    issuance_tx_id: 'String',
    issuance_json: 'String'
  }, equbitData)
  return compose([
    prop('payment_currency', bufferUInt32),        // 0 - means no currency (for blank equibits) and 1 -- means BitCoin
    // TODO: don't forget to reverse tx id here:
    prop('payment_tx_id', bufferVarSlice('hex')),  // var length slice
    prop('issuance_tx_id', bufferHash),            // tx hash
    prop('issuance_json', bufferVarSlice('ascii')) // JSON payload, var length slice
  ])(equbitData, EMPTY_BUFFER)
}

// Prepare reusable functions:
const buildTxCopyEqb = options => makeBuildTxCopy(bufferOutputEqb(options))
const bufferInputEqb = options => makeBufferInput(buildTxCopyEqb(options), options)

module.exports = {
  buildTx,
  buildTxCopyEqb,
  buildEquibitData,
  bufferInputs,
  bufferInputEqb,
  bufferOutputEqb,
  vinScript,
  log
}
