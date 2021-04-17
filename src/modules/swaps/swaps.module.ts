import { Module } from '@nestjs/common';
import { ActiveOrdersService } from './services/ActiveOrders.service';
import { OrdersService } from './services/Orders.service';
import { SwapsGateway } from './swaps.gateway';
import { SwapsService } from './swaps.service';

@Module({
  providers: [SwapsService, OrdersService, ActiveOrdersService, SwapsGateway],
})
export class SwapsModule {
  constructor() {}
}
