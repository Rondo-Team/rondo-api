import { Id } from "../../../shared/domain/value-objects/Id.ts";

export class ProposalHistoryEntrieId extends Id {
  constructor(readonly value: string) {
    super(value);
  }
}
