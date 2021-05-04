import {Controller, Get, Param} from "@nestjs/common";

@Controller('/')
export class BlockchainController {
  @Get('address/:address')
  addressInfo(@Param('address') address) {
    console.log(address);
  }
}