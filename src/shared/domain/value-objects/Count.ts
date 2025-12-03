import { DomainError } from "../../error-handling/domain/DomainError.ts";

export abstract class Count {
  protected abstract CountIsInvalidError(): DomainError;
  readonly value: number;
  private upperLimit: number;

  constructor(value: number, upperLimit: number) {
    this.value = value;
    this.upperLimit = upperLimit;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (
      !Number.isInteger(this.value) ||
      this.value < 0 ||
      this.value > this.upperLimit
    )
      throw this.CountIsInvalidError();
  }
}
