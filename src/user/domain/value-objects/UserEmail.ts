import { UserEmailIsInvalidError } from "@/user/domain/errors/UserEmailIsInvalidError";

export class UserEmail {
  constructor(readonly value: string) {
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
