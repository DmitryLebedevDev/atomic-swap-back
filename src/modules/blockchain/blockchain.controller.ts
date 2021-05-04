import {Controller, Get, Param} from "@nestjs/common";
import {BlockchainService} from "./blockchain.service";

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
}