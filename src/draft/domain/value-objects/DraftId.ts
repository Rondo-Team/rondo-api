import { Id } from "@/shared/domain/value-objects/Id";

export class DraftId extends Id {
  constructor(value: string) {
    super(value);
  }
}
