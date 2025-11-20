import { UserEmailIsInvalidError } from "@/user/domain/errors/UserEmailIsInvalidError";

export class UserEmail {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const regex = /^\S+@\S+\.\S+$/;

    if (!regex.test(this.value)) throw new UserEmailIsInvalidError(this.value);
  }
}
