import { UserEmailIsInvalidError } from "../errors/UserEmailIsInvalidError.ts";

export class UserEmail {
  readonly value: string;
  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const regex = /^\S+@\S+\.\S+$/;

    if (!regex.test(this.value)) throw new UserEmailIsInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }
}
