import { Id } from "../../../shared/domain/value-objects/Id.ts";

export class CommentId extends Id {
  readonly value: string
  constructor(value: string) {
    super(value);
    this.value = value
  }
}
