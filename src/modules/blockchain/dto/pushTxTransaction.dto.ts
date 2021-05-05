import {IsNotEmpty, IsString} from "class-validator";

export class PushTxTransactionDto {
  @IsString()
  @IsNotEmpty()
  hex: string
}