import { Module } from "@nestjs/common";
import { SwapsGateway } from "./swaps.gateway";
import { SwapsService } from "./swaps.service";

@Module({
  providers: [SwapsService, SwapsGateway]
})
export class SwapsModule {}