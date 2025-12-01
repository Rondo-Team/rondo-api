import { Id } from "@/shared/domain/value-objects/Id";

export class ProposalId extends Id {
  constructor(readonly value: string) {
    super(value);
  }
}
