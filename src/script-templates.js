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
