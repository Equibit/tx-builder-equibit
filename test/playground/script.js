const ecdsa = require('bitcoinjs-lib/src/ecdsa')
const Buffer = require('safe-buffer').Buffer
const randomBytes = require('randombytes')
const bitcoin = require('bitcoinjs-lib')
const bcrypto = bitcoin.crypto
const bscript = bitcoin.script
const baddress = bitcoin.address

const hdNode = require('../fixtures/hdnode').hdNode
const addrHdNode = require('../fixtures/hdnode').addrHdNode
const addr = require('../fixtures/hdnode').address
const keyPair = hdNode.keyPair

// fromBase58Check
// const addr = 'mgTy8id9wzj4T4g4pQvCyuxZjVYvRpeKGt'
const base58Decoded = baddress.fromBase58Check(addr)
console.log(`addr base58Decoded = {version: ${base58Decoded.version}, hash: ${base58Decoded.hash.toString('hex')}}`)

// Ex.1:
const evaluate = require('bitcoin-script').evaluate
let script = 'OP_2 OP_3 OP_MUL OP_6 OP_EQUAL OP_VERIFY'
let result = evaluate(script, true)
console.log(`\nEx.1 script: ${script} = ${result}`)

// Ex.2:
const sig2 = '30440220014eb16fe0f5640494f5f414266a70b9c775f5229f1129a283327841287fbc3102203e83d340da6c6af74c727f38f6d6a514bc2da7a19a4629785ce44938d430e8b3'
const pubKeyString2 = '037f167872316efa206932fa945793e869bcdb56bdabf45d1752d86f59a2f29746'
script = `${sig2} ${pubKeyString2} OP_DUP OP_HASH160 cae4b6aefb48b3505d22fafcef5acf255015d100 OP_EQUALVERIFY OP_CHECKSIG`
result = evaluate(script)
console.log(`\nEx.2 script: ${script} = ${result}`)

// Ex.3: P2PK script
const pubKey3 = keyPair.getPublicKeyBuffer()
const pubKeyString3 = pubKey3.toString('hex')
const hash3 = Buffer.alloc(32, 'abc')
const sig3 = keyPair.sign(hash3)
const sigString3 = sig3.r.toString() + sig3.s.toString()
console.log(`\nEx3: pubKey = ${pubKeyString3}, \nsig = ${sigString3}`)
script = `${sigString3} ${pubKeyString3} OP_CHECKSIG`
result = evaluate(script)
console.log(`Ex3: script: ${script} = ${result}`)
const verify3 = ecdsa.verify(hash3, sig3, keyPair.Q)
console.log(`Ex3: verify3 = ${verify3}`)

// Ex.4
const sigString4 = '8459928119273117345498277881459870695761758288324491597610541854186847739718715161792675821745501378459187582098956166340492444286324429807893570567079694'
const pubKeyString4 = '0348726694288015a15558ed9bebcf398684cb95988bb9fa1c59366415871e9ecc'
script = `${sigString4} ${pubKeyString4} OP_CHECKSIG`
result = evaluate(script)
console.log(`\nEx4: script: ${script} = ${result}`)

// Ex.5 Compile script
const script5 = 'OP_2 OP_3 OP_MUL OP_6 OP_EQUAL OP_VERIFY'
const scriptSig5 = bscript.fromASM(script5)
console.log(`\nEx5: script5 = ${script5}, scriptSig = ${scriptSig5.toString('hex')}`)

// Ex.6 Hashed Timelock contract
const secretBuffer = randomBytes(32)
const secret = secretBuffer.toString('hex')
const hashSecretBuffer = bcrypto.sha256(secretBuffer)
const hashSecret = hashSecretBuffer.toString('hex')
const buyerAddr = addrHdNode.getPublicKeyBuffer().toString('hex')
const sellerAddr = buyerAddr
const locktime = 10
const script6 = `
OP_IF
  OP_SHA256 ${hashSecret} OP_EQUALVERIFY
  OP_DUP OP_HASH160 ${buyerAddr}
OP_ELSE
  ${locktime} OP_CHECKLOCKTIMEVERIFY OP_DROP
  OP_DUP OP_HASH160 ${sellerAddr}
OP_ENDIF
OP_EQUALVERIFY OP_CHECKSIG
`.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()
console.log(`secret = ${secret}`)
console.log(`script6 = ${script6}`)
const scriptSig6 = bscript.fromASM(script6)
console.log(`\nEx6: script6 = ${script6}, scriptSig6 = ${scriptSig6.toString('hex')}`)

// scriptPubKey:
// Buyer: `signature publicKey secretX`
// Seller `signature publicKey`
