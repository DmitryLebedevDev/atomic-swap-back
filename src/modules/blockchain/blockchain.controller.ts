import {Body, Controller, Get, Param, ParseIntPipe, Post, Query} from "@nestjs/common";
import {BlockchainService} from "./blockchain.service";
import {PushTxTransactionDto} from "./dto/pushTxTransaction.dto";

@Controller('/')
export class BlockchainController {
  constructor(private blockchainService: BlockchainService) {
  }

  @Get('address/:address')
  async addressInfo(@Param('address') address) {
    try {
      const balance = await this.blockchainService.getAddressBalance(address);
      return {
        status: true,
        address: {
          total: balance
        }
      };
    } catch (e) {
      return {
        status: false,
        message: 'incorrect address'
      }
    }
  }
  @Get('address/:address/unspent')
  async addressUnspent(@Param('address') address) {
    try {
      const unspent = await this.blockchainService.getAddressUnspent(address);
      return {
        status: true,
        unspent
      }
    } catch (e) {
      return {
        status: false,
        massage: 'incorrect address'
      }
    }
  }
  @Post('/pushtx')
  async pushTx(@Body() pushTxHex: PushTxTransactionDto) {
    try {
      return {
        status: true,
        txid: await this.blockchainService.pushTx(pushTxHex.hex)
      }
    } catch (error) {
      return {
        status: false,
        message: error.message
      }
    }
  }
  @Post('/getVinForUtxoTransaction/:txid')
  async getVinForUtxoTransaction(@Query('n', ParseIntPipe) n) {

  }
}