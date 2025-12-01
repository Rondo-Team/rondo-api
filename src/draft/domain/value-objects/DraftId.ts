import { Id } from "@/shared/domain/value-objects/Id";

export class DraftId extends Id {
  constructor(readonly value: string) {
    super(value);
  }
}
