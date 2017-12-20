module.exports = {
  hashTimeLock: function (redeemerAddr, funderAddr, hashSecret, locktime) {
    return `
      OP_IF
        OP_SHA256 ${hashSecret} OP_EQUALVERIFY
        OP_DUP OP_HASH160 ${redeemerAddr}
      OP_ELSE
        ${locktime} OP_CHECKLOCKTIMEVERIFY OP_DROP
        OP_DUP OP_HASH160 ${funderAddr}
      OP_ENDIF
      OP_EQUALVERIFY OP_CHECKSIG
    `
  }
}

// To unlock HTLC with scriptSig:
// Buyer: `signature publicKey secretX`
// Seller `signature publicKey`

// Ilya Buyer:
// - generate SecretX, + hashSecret
// TX1 Bitcoin: if (hashSecret && Sergey) else (timelock 72 && Ilya)

// Sergey Seller:
// Tx2 Equibit: if (hashSecret && IlyaEqb1) else (timelock 24 && SergeyEqb1)

// Ilya: claim equibit revealing secret:
// Tx3 Equibit: TX2 -> (signature Ilya pubKey SecretX) to IlyaEqb2 address

// Sergey: claim bitcoin using secret:
// TX4 Bitcoin: TX1 -> (Sergey signature pubKey SecretX) -> to Sergey address
