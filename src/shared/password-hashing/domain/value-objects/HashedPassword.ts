import { HashedPasswordIsTooShortError } from "@/shared/password-hashing/domain/errors/HashedPasswordIsTooShortError";

export class HashedPassword {
  constructor(readonly value: string) {
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value.length < 20) throw new HashedPasswordIsTooShortError();
  }

  toPrimitives() {
    return this.value;
  }
}
