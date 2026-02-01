import { Id } from "../../../domain/value-objects/Id.ts";

export class FavouriteId extends Id {
  readonly value: string;
  constructor(value: string) {
    super(value);
    this.value = value;
  }

  static fromPrimitives(value: string) {
    return new FavouriteId(value)
  }
}
