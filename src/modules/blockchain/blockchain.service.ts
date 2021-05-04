import {Injectable} from "@nestjs/common";
import * as Client from 'bitcoin-core'

@Injectable()
export class BlockchainService {
  constructor() {
    const client = new Client({
      network: 'regtest',
      username: 'test',
      password: '1234',
      port: 18443
    });

    client.listUnspent(6, 999999, ['mzqv4ZydSdtKw1QtpGEcR148GgJrYr959o']).then((help) => console.log(help));
  }
}