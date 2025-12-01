import { ProposalHistoryEntrieId } from "@/proposal-history-entrie/domain/value-objects/ProposalHistoryEntrieId";
import { ProposalId } from "@/proposal/domain/value-objects/ProposalId";
import { ReplyProposalHistoryEntrieAlreadyExistsWithIdError } from "../../domain/errors/ReplyProposalHistoryEntrieAlreadyExistsWithIdError";
import { ReplyProposalHistoryEntrieRepository } from "../../domain/repositories/ReplyProposalHistoryEntrieRepository";

export class DeleteById {
  constructor(
    private replyProposalHistoryEntrieRepository: ReplyProposalHistoryEntrieRepository
  ) {}

  async run(id: string) {
    // Check already exists
    if (
      !(await this.replyProposalHistoryEntrieRepository.existsWithId(
        new ProposalHistoryEntrieId(id)
      ))
    )
      throw new ReplyProposalHistoryEntrieAlreadyExistsWithIdError(id);

    return this.replyProposalHistoryEntrieRepository.deleteById(
      new ProposalId(id)
    );
  }
}
