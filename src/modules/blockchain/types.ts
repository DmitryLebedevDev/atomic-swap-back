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
export interface Itransaction {
  txid: string,
  vin: Ivin[]
}