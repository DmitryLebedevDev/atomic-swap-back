import {Injectable} from "@nestjs/common";
import * as Client from 'bitcoin-core'
import {getInfoTxOutputError, Iblock, Itransaction} from "./types";

@Injectable()
export class BlockchainService {
  client: InstanceType<typeof Client>
  constructor() {
    this.client = new Client({
      network: process.env.BITCOIN_CORE_NETWORK,
      username: process.env.BITCOIN_CORE_USER,
      password: process.env.BITCOIN_CORE_PASSWORD,
      port: process.env.BITCOIN_CORE_PORT
    });
  }

  async getAddressBalance(address: string) {
    const listUnspent
      = await this.client.listUnspent(6, 999999, [address]);

    return listUnspent.reduce(
      (sum, {amount}) => sum+amount
      , 0
    )
  }
  async getAddressUnspent(address: string) {
    const listUnspent
      = await this.client.listUnspent(6, 999999, [address]);
    console.log(listUnspent);
    return listUnspent.map(
      ({txid, amount, scriptPubKey, vout: n, confirmations}) => ({
        txid,
        value: amount,
        script_pub_key: {
          hex: scriptPubKey
        },
        n,
        confirmations
      })
    )
  }
  async getVinForUtxoTransaction(txid: string, n: number) {
    const transaction = await this.getTransaction(txid);
    if(!transaction || !transaction.blockhash) {throw new Error(
      String(getInfoTxOutputError.notExistTransaction)
    )}
    if(transaction.vout.length <= n) {throw new Error(
      String(getInfoTxOutputError.notExistVout)
    )}
    const utxoExist = await this.client.getTxOut(txid, n);
    if(utxoExist) {throw new Error(
      String(getInfoTxOutputError.utxoNotUnspent)
    )}
    let block: Iblock = await this.client.getBlock(transaction.blockhash);
    do {
      const vin
        = await this.findVinOfUtxoTransactionInBlock(block, txid, n);
      if(vin) {
        return vin
      }
      if(block.nextblockhash) {
        block = await this.client.getBlock(block.nextblockhash)
      } else {
        break;
      }
    }
    while (true)
    throw new Error(
      String(getInfoTxOutputError.notExistVout)
    )
  }
  private async findVinOfUtxoTransactionInBlock(
    block: Iblock, txid: string, n: number
  ) {
    const blockTransactions = await Promise.all(
      block.tx.map(txid => this.getTransaction(txid))
    )
    const transaction = blockTransactions.find(
      ({vin}) => vin.find(
        vin => vin.txid === txid && vin.vout === n
      )
    )

    return transaction ?
      transaction.vin.find(
        vin => vin.txid === txid && vin.vout === n
      ) : null
  }
  async getTransaction(txid: string): Promise<Itransaction> {
    return this.client.getRawTransaction(txid, true)
  }
  async pushTx(hex: string) {
    return this.client.sendRawTransaction(hex);
  }
}