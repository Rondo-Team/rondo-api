import { ProposalId } from "../../../proposal/domain/value-objects/ProposalId.ts";
import type { Primitives } from "../../../shared/domain/types/Primitives.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { ProposalHistoryEntrie } from "../../domain/ProposalHistoryEntrie.ts";
import { ProposalHistoryEntrieId } from "../../domain/value-objects/ProposalHistoryEntrieId.ts";

export type ActivityProposalHistoryEntriePrimitives =
  Primitives<ActivityProposalHistoryEntrie>;

export class ActivityProposalHistoryEntrie extends ProposalHistoryEntrie {
  constructor(
    id: ProposalHistoryEntrieId,
    proposalId: ProposalId,
    userId: UserId,
    createdAt: CreatedAt,
  ) {
    super(id, proposalId, userId, createdAt);
  }

  toPrimitives() {
    return {
      id: this.id.toPrimitives(),
      proposalId: this.proposalId.toPrimitives(),
      userId: this.userId.toPrimitives(),
      createdAt: this.createdAt.toPrimitives(),
    };
  }

  static fromPrimitives(primitives: ActivityProposalHistoryEntriePrimitives) {
    return new ActivityProposalHistoryEntrie(
      ProposalHistoryEntrieId.fromPrimitives(primitives.id),
      ProposalId.fromPrimitives(primitives.proposalId),
      UserId.fromPrimitives(primitives.userId),
      CreatedAt.fromPrimitives(primitives.createdAt),
    );
  }
}
