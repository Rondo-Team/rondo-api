import {
  USER_NAME_CHAR_LOWER_LIMIT,
  USER_NAME_CHAR_UPPER_LIMIT,
} from "../../../config/domain/Consts.ts";
import { UserNameContainsInvalidCharactersError } from "../errors/UserNameContainsInvalidCharactersError.ts";
import { UserNameIsTooLongError } from "../errors/UserNameIsTooLongError.ts";
import { UserNameIsTooShortError } from "../errors/UserNameIsTooShortError.ts";

export class UserName {
  readonly value: string;
  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const nameLength = this.value.length;
    const regex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

    if (nameLength > USER_NAME_CHAR_UPPER_LIMIT)
      throw new UserNameIsTooLongError(this.value);
    if (nameLength < USER_NAME_CHAR_LOWER_LIMIT)
      throw new UserNameIsTooShortError(this.value);
    if (!regex.test(this.value))
      throw new UserNameContainsInvalidCharactersError(this.value);
  }
}
