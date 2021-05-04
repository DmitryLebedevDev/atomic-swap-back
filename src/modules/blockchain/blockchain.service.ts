import {Injectable} from "@nestjs/common";
import * as Client from 'bitcoin-core'

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
}