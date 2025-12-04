import { ProposalId } from "../../../../proposal/domain/value-objects/ProposalId.ts";
import { ProposalHistoryEntrieId } from "../../../domain/value-objects/ProposalHistoryEntrieId.ts";
import { ReplyProposalHistoryEntrieAlreadyExistsWithIdError } from "../../domain/errors/ReplyProposalHistoryEntrieAlreadyExistsWithIdError.ts";
import type { ReplyProposalHistoryEntrieRepository } from "../../domain/repositories/ReplyProposalHistoryEntrieRepository.ts";

export class DeleteById {
  private replyProposalHistoryEntrieRepository: ReplyProposalHistoryEntrieRepository;
  constructor(
    replyProposalHistoryEntrieRepository: ReplyProposalHistoryEntrieRepository
  ) {
    this.replyProposalHistoryEntrieRepository =
      replyProposalHistoryEntrieRepository;
  }

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
