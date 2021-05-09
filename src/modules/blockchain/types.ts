export enum getInfoTxOutputError {
  notExistTransaction,
  utxoNotUnspent,
  notExistVout
}
export interface Iblock {
  tx: string[],
  nextblockhash?: string
}
export interface Ivin {
  txid: string,
  vout: 0,
  scriptSig: {
    asm: string,
    hex: string
  },
  sequence: number
}
export interface Ivout {
  value: 50.00000000,
  n: 0,
  scriptPubKey: {
    asm: string,
    hex: string,
    reqSigs?: number,
    type: string,
    addresses: string[]
  }
}
export interface Itransaction {
  txid: string,
  vin: Ivin[],
  blockhash?: string,
  vout: Ivout[]
}