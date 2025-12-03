import { CreationDateInvalidError } from "../errors/CreationDateInvalidError.ts";

export class CreatedAt {
  readonly value: Date;
  constructor(value: Date) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value > new Date()) throw new CreationDateInvalidError(this.value);
  }
}
