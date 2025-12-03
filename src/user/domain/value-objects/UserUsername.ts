import {
  USERNAME_CHAR_LOWER_LIMIT,
  USERNAME_CHAR_UPPER_LIMIT,
} from "../../../config/domain/Consts.ts";
import { UserUsernameIsInvalidError } from "../errors/UserUsernameIsInvalidError.ts";
import { UserUsernameIsTooLongError } from "../errors/UserUserNameIsTooLongError.ts";
import { UserUsernameIsTooShortError } from "../errors/UserUsernameIsTooShortError.ts";

export class UserUsername {
  readonly value: string;
  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const usernameLength = this.value.length;
    const regex = /^[a-zA-Z0-9._]+$/;
    if (usernameLength < USERNAME_CHAR_LOWER_LIMIT)
      throw new UserUsernameIsTooShortError(this.value);
    if (usernameLength > USERNAME_CHAR_UPPER_LIMIT)
      throw new UserUsernameIsTooLongError(this.value);
    if (!regex.test(this.value))
      throw new UserUsernameIsInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }
}
