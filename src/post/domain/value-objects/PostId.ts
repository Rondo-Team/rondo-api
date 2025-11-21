import { Id } from "@/shared/domain/value-objects/Id";

export class PostId extends Id {
  constructor(value: string) {
    super(value);
  }
}
