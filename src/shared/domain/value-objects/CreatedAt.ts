import { CreationDateInvalidError } from "../errors/CreationDateInvalidError";

export class CreatedAt {
  value: Date;

  constructor(value: Date) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value > new Date())
      throw new CreationDateInvalidError(this.value);
  }
}