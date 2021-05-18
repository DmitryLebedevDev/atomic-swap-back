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
        success: true,
        address: {
          total: {balance}
        }
      };
    } catch (e) {
      return {
        success: false,
        message: 'incorrect address'
      }
    }
  }
  @Get('address/:address/unspent')
  async addressUnspent(@Param('address') address) {
    try {
      const unspent = await this.blockchainService.getAddressUnspent(address);
      return {
        success: true,
        unspent
      }
    } catch (e) {
      return {
        success: false,
        massage: 'incorrect address'
      }
    }
  }
  @Post('/pushtx')
  async pushTx(@Body() pushTxHex: PushTxTransactionDto) {
    try {
      return {
        success: true,
        txid: await this.blockchainService.pushTx(pushTxHex.hex)
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
  @Get('/getVinForUtxoTransaction/:txid')
  async getVinForUtxoTransaction(@Param('txid') txid, @Query('n', ParseIntPipe) n) {
    try {
      const vin = await this.blockchainService.getVinForUtxoTransaction(txid, n);
      console.log(vin)
      return {
        success: true,
        vin
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }
  @Get('/tx/:txid')
  async getRawTransaction(@Param('txid') txid) {
    try {
      return {
        success: true,
        transaction: await this.blockchainService.getTransaction(txid)
      }
    }
    catch (e) {
      return {
        success: false,
        message: 'not exist'
      }
    }
  }
}