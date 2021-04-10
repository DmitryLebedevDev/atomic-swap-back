import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"

@ValidatorConstraint()
export class EqualsOr implements ValidatorConstraintInterface {
  validate(fieldValue, {constraints}: ValidationArguments) {
    return constraints.some(value => value === fieldValue)
  }
  defaultMessage({constraints}: ValidationArguments) {
    return `$value not in the list of allowed {${constraints}}`
  }
}