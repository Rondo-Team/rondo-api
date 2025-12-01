import { Id } from "@/shared/domain/value-objects/Id";

export class UserId extends Id {
  constructor(readonly value: string) {
    super(value);
  }
}
