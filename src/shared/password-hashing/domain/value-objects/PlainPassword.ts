import { PasswordIsInvalidError } from "../errors/PasswordIsInvalidError";

export class PlainPassword {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/;
    if (!regex.test(this.value)) throw new PasswordIsInvalidError();
  }

  toPrimitives() {
    return this.value;
  }
}
