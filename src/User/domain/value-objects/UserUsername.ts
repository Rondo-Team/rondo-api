import { UserUsernameIsInvalidError } from "@/user/domain/errors/UserUsernameIsInvalidError";
import { UserUsernameIsTooLongError } from "@/user/domain/errors/UserUserNameIsTooLongError";
import { UserUsernameIsTooShortError } from "@/user/domain/errors/UserUsernameIsTooShortError";

export class UserUsername {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const usernameLength = this.value.length;
    const regex = /^[a-zA-Z0-9._]+$/;
    if (usernameLength < 3) throw new UserUsernameIsTooShortError(this.value);
    if (usernameLength > 20) throw new UserUsernameIsTooLongError(this.value);
    if (!regex.test(this.value))
      throw new UserUsernameIsInvalidError(this.value);
  }
}
