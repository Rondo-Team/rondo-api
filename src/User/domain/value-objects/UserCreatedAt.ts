import { UserCreationDateInvalidError } from "@/User/domain/errors/UserCreationDateInvalidError";

export class UserCreatedAt {
  value: Date;

  constructor(value: Date) {
    this.value = value;
    this.ensureIsValid()
  }

  private ensureIsValid() {
    if (this.value > new Date)
      throw new UserCreationDateInvalidError(this.value);
  }
}
