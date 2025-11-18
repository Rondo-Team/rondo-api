import { HashedPasswordIsTooShortError } from "../errors/HashedPasswordIsTooShortError";

export class HashedPassword {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value.length < 20) throw new HashedPasswordIsTooShortError();
  }

  toPrimitives() {
    return this.value
  }
}
