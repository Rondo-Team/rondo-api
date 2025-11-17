import { UserNameContainsInvalidCharactersError } from "../errors/UserNameContainsInvalidCharactersError";
import { UserNameIsTooLongError } from "../errors/UserNameIsTooLongError";
import { UserNameIsTooShortError } from "../errors/UserNameIsTooShortError";

export class UserName {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const nameLength = this.value.length;
    const regex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

    if (nameLength > 50) throw new UserNameIsTooLongError(this.value);
    if (nameLength < 2) throw new UserNameIsTooShortError(this.value);
    if (!regex.test(this.value)) throw new UserNameContainsInvalidCharactersError(this.value)
  }
}
