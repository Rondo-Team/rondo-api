import { Id } from "../../../shared/domain/value-objects/Id.ts";

export class PostId extends Id {
  constructor(readonly value: string) {
    super(value);
  }
}
