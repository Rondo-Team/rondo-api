import { Id } from "@/shared/domain/value-objects/Id";

export class CommentId extends Id {
  constructor(readonly value: string) {
    super(value);
  }
}
