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
  vout: number,
  scriptSig: {
    asm: string,
    hex: string
  },
  sequence: number
}
export interface Ivout {
  value: number,
  n: number,
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