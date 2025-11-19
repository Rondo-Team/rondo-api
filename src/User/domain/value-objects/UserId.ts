import { IdNotLongEnough } from "../../../shared/error-handling/domain/errors/IdNotLongEnoughError";

export class UserId {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid()
  }

  private ensureIsValid() {
    if (this.value.length < 5) throw new IdNotLongEnough(this.value)
  }

  toPrimitives() {
    return this.value
  }
}
