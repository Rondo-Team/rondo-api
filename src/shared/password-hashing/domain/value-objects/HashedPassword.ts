import { HashedPasswordIsTooShortError } from "../errors/HashedPasswordIsTooShortError.ts";

export class HashedPassword {
  readonly value: string;
  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value.length < 20) throw new HashedPasswordIsTooShortError();
  }

  toPrimitives() {
    return this.value;
  }

  static fromPrimitives(value: string) {
    return new HashedPassword(value);
  }
}
