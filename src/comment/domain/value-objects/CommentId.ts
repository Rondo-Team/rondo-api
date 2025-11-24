import { Id } from "@/shared/domain/value-objects/Id";

export class CommentId extends Id {
  constructor(value: string) {
    super(value);
  }
}
