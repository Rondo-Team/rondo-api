import { Id } from "../../../domain/value-objects/Id.ts";

export class FavouriteId extends Id {
  constructor(readonly value: string) {
    super(value);
  }
}
