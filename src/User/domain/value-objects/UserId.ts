import { IdIsNotValidError } from "@/shared/error-handling/domain/errors/IdIsNotValidError";

export class UserId {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid()
  }

  
  private ensureIsValid() {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!regex.test(this.value)) throw new IdIsNotValidError(this.value)
  }

  toPrimitives() {
    return this.value
  }
}
