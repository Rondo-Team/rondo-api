import { Id } from "../../../shared/domain/value-objects/Id.ts";

export class DraftId extends Id {
  readonly value: string;
  constructor(value: string) {
    super(value);
    this.value = value;
  }

  static fromPrimitives(id: string) {
    return new DraftId(id);
  }
}
