import { ProposalId } from "../../../../proposal/domain/value-objects/ProposalId.ts";
import { ProposalHistoryEntrieId } from "../../../domain/value-objects/ProposalHistoryEntrieId.ts";
import type { ReplyProposalHistoryEntrie } from "../ReplyProposalHistoryEntrie.ts";

export interface ReplyProposalHistoryEntrieRepository {
  create(replyProposalHistoryEntrie: ReplyProposalHistoryEntrie): Promise<void>;
  getAllByProposalId(
    proposalId: ProposalId,
  ): Promise<ReplyProposalHistoryEntrie[]>;
  deleteById(id: ProposalHistoryEntrieId): Promise<void>;
  existsWithId(id: ProposalHistoryEntrieId): Promise<boolean>;
}
