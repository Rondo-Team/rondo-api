import { USERNAME_CHAR_LOWER_LIMIT, USERNAME_CHAR_UPPER_LIMIT } from "@/config";
import { UserUsernameIsInvalidError } from "@/user/domain/errors/UserUsernameIsInvalidError";
import { UserUsernameIsTooLongError } from "@/user/domain/errors/UserUserNameIsTooLongError";
import { UserUsernameIsTooShortError } from "@/user/domain/errors/UserUsernameIsTooShortError";

export class UserUsername {
  constructor(readonly value: string) {
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
