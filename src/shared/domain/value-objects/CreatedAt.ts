import { CreationDateInvalidError } from "../errors/CreationDateInvalidError";

export class CreatedAt {
  constructor(readonly value: Date) {
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value > new Date()) throw new CreationDateInvalidError(this.value);
  }
}
