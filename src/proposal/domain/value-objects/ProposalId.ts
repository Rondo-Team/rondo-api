import { Id } from "@/shared/domain/value-objects/Id";

export class ProposalId extends Id {
  constructor(value: string) {
    super(value);
  }
}
