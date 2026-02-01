import { UserUsernameChangeDateInvalidError } from "../errors/UserUsernameChangeDateInvalidError.ts";

export class UserUsernameChangedAt {
  readonly value: Date;
  constructor(value: Date) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value > new Date())
      throw new UserUsernameChangeDateInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }

  static fromPrimitives(value: Date) {
    return new UserUsernameChangedAt(value);
  }
}
