import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EqualsOr } from 'src/common/validators/EqualsOr';

@ValidatorConstraint()
export class ValidatePair implements ValidatorConstraintInterface {
  validate(_, { object }: any) {
    return object.fromValuePair !== object.toValuePair;
  }
  defaultMessage() {
    return 'it is impossible to exchange coins in the same network';
  }
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  fromValue: number;

  @IsNotEmpty()
  @IsString()
  @Validate(EqualsOr, ['testnet', 'regnet'])
  @Validate(ValidatePair)
  fromValuePair: 'testnet' | 'regnet';

  @IsNotEmpty()
  @IsNumber()
  toValue: number;

  @IsNotEmpty()
  @IsString()
  @Validate(EqualsOr, ['testnet', 'regnet'])
  toValuePair: 'testnet' | 'regnet';
}
