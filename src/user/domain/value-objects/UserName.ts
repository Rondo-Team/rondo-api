import { USER_NAME_CHAR_LOWER_LIMIT, USER_NAME_CHAR_UPPER_LIMIT } from "@/config";
import { UserNameContainsInvalidCharactersError } from "@/user/domain/errors/UserNameContainsInvalidCharactersError";
import { UserNameIsTooLongError } from "@/user/domain/errors/UserNameIsTooLongError";
import { UserNameIsTooShortError } from "@/user/domain/errors/UserNameIsTooShortError";

export class UserName {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const nameLength = this.value.length;
    const regex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

    if (nameLength > USER_NAME_CHAR_UPPER_LIMIT) throw new UserNameIsTooLongError(this.value);
    if (nameLength < USER_NAME_CHAR_LOWER_LIMIT) throw new UserNameIsTooShortError(this.value);
    if (!regex.test(this.value))
      throw new UserNameContainsInvalidCharactersError(this.value);
  }
}
