import { ProposalRepository } from "../../../../proposal/domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../../../proposal/domain/services/ProposalFinder.ts";
import { ProposalId } from "../../../../proposal/domain/value-objects/ProposalId.ts";
import { CreatedAt } from "../../../../shared/domain/value-objects/CreatedAt.ts";
import { UserRepository } from "../../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";
import { ProposalHistoryEntrieId } from "../../../domain/value-objects/ProposalHistoryEntrieId.ts";
import { ReplyProposalHistoryEntrieAlreadyExistsWithIdError } from "../../domain/errors/ReplyProposalHistoryEntrieAlreadyExistsWithIdError.ts";
import { ReplyProposalHistoryEntrie } from "../../domain/ReplyProposalHistoryEntrie.ts";
import { ReplyProposalHistoryEntrieRepository } from "../../domain/repositories/ReplyProposalHistoryEntrieRepository.ts";
import { ReplyProposalHistoryEntrieMessage } from "../../domain/value-objects/ReplyProposalHistoryEntrieMessage.ts";

export class CreateReplyProposalHistoryEntrie {
  private readonly userFinder: UserFinder;
  private readonly proposalFinder: ProposalFinder;
  constructor(
    private replyProposalHistoryEntrieRepository: ReplyProposalHistoryEntrieRepository,
    userRepository: UserRepository,
    proposalRepository: ProposalRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
    this.proposalFinder = new ProposalFinder(proposalRepository);
  }

  async run(
    id: string,
    proposalId: string,
    userId: string,
    createdAt: Date,
    message: string
  ) {
    const reply = new ReplyProposalHistoryEntrie(
      new ProposalHistoryEntrieId(id),
      new ProposalId(proposalId),
      new UserId(userId),
      new CreatedAt(createdAt),
      new ReplyProposalHistoryEntrieMessage(message)
    );

    // Check not already exists
    if (
      await this.replyProposalHistoryEntrieRepository.existsWithId(
        new ProposalHistoryEntrieId(id)
      )
    )
      throw new ReplyProposalHistoryEntrieAlreadyExistsWithIdError(id);

    // Check user and proposal existance
    await this.userFinder.findById(new UserId(userId));
    await this.proposalFinder.findById(new ProposalId(proposalId));

    return this.replyProposalHistoryEntrieRepository.create(reply);
  }
}
