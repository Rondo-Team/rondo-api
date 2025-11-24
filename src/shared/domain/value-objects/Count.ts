import { DomainError } from "@/shared/error-handling/domain/DomainError";

export abstract class Count {
  protected abstract CountIsInvalidError(): DomainError;

  constructor(public value: number, private upperLimit) {
    this.value = value;
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
