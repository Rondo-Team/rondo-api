import { Id } from "@/shared/domain/value-objects/Id";

export class ProposalHistoryEntrieId extends Id {
  constructor(value: string) {
    super(value);
  }
}
