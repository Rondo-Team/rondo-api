import { ProposalId } from "../../../proposal/domain/value-objects/ProposalId.ts";
import type { Primitives } from "../../../shared/domain/types/Primitives.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { ProposalHistoryEntrie } from "../../domain/ProposalHistoryEntrie.ts";
import { ProposalHistoryEntrieId } from "../../domain/value-objects/ProposalHistoryEntrieId.ts";
import { ReplyProposalHistoryEntrieMessage } from "./value-objects/ReplyProposalHistoryEntrieMessage.ts";

export type ReplyProposalHistoryEntriePrimitives =
  Primitives<ReplyProposalHistoryEntrie>;

export class ReplyProposalHistoryEntrie extends ProposalHistoryEntrie {
  message: ReplyProposalHistoryEntrieMessage;
  constructor(
    id: ProposalHistoryEntrieId,
    proposalId: ProposalId,
    userId: UserId,
    createdAt: CreatedAt,
    message: ReplyProposalHistoryEntrieMessage,
  ) {
    super(id, proposalId, userId, createdAt);
    this.message = message;
  }

  toPrimitives() {
    return {
      id: this.id.toPrimitives(),
      proposalId: this.proposalId.toPrimitives(),
      userId: this.userId.toPrimitives(),
      createdAt: this.createdAt.toPrimitives(),
      message: this.message.toPrimitives(),
    };
  }

  static fromPrimitives(primitives: ReplyProposalHistoryEntriePrimitives) {
    return new ReplyProposalHistoryEntrie(
      ProposalHistoryEntrieId.fromPrimitives(primitives.id),
      ProposalId.fromPrimitives(primitives.proposalId),
      UserId.fromPrimitives(primitives.userId),
      CreatedAt.fromPrimitives(primitives.createdAt),
      ReplyProposalHistoryEntrieMessage.fromPrimitives(primitives.message),
    );
  }
}
