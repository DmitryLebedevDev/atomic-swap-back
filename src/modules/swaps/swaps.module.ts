import { Module } from "@nestjs/common";
import { OrdersService } from "./services/orders.service";
import { SwapsGateway } from "./swaps.gateway";
import { SwapsService } from "./swaps.service";

@Module({
  providers: [
    SwapsService,
    OrdersService,
    SwapsGateway
  ]
})
export class SwapsModule {
  constructor() {}
}