import { Id } from "@/shared/domain/value-objects/Id";

export class FavouriteId extends Id {
  constructor(value: string) {
    super(value)
  }
}