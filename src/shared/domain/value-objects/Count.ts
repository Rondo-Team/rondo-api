import { DomainError } from "../../error-handling/domain/DomainError.ts";

export abstract class Count {
  protected abstract CountIsInvalidError(): DomainError;

  constructor(readonly value: number, private upperLimit) {
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
