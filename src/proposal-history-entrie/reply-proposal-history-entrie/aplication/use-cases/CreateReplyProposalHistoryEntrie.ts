import { ProposalHistoryEntrieId } from "@/proposal-history-entrie/domain/value-objects/ProposalHistoryEntrieId"
import { ProposalRepository } from "@/proposal/domain/repositories/ProposalRepository"
import { ProposalFinder } from "@/proposal/domain/services/ProposalFinder"
import { ProposalId } from "@/proposal/domain/value-objects/ProposalId"
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt"
import { UserRepository } from "@/user/domain/repositories/UserRepository"
import { UserFinder } from "@/user/domain/services/UserFinder"
import { UserId } from "@/user/domain/value-objects/UserId"
import { ReplyProposalHistoryEntrieAlreadyExistsWithIdError } from "../../domain/errors/ReplyProposalHistoryEntrieAlreadyExistsWithIdError"
import { ReplyProposalHistoryEntrie } from "../../domain/ReplyProposalHistoryEntrie"
import { ReplyProposalHistoryEntrieRepository } from "../../domain/repositories/ReplyProposalHistoryEntrieRepository"
import { ReplyProposalHistoryEntrieMessage } from "../../domain/value-objects/ReplyProposalHistoryEntrieMessage"

export class CreateReplyProposalHistoryEntrie {
  private readonly userFinder: UserFinder
  private readonly proposalFinder: ProposalFinder
  constructor(
    private replyProposalHistoryEntrieRepository: ReplyProposalHistoryEntrieRepository,
    userRepository: UserRepository,
    proposalRepository: ProposalRepository
  ) {
    this.userFinder = new UserFinder(userRepository)
    this.proposalFinder = new ProposalFinder(proposalRepository)
  }

  async run(
    id: string,
    userId: string,
    proposalId: string,
    createdAt: Date,
    message: string
  ) {
    const reply = new ReplyProposalHistoryEntrie(
      new ProposalHistoryEntrieId(id),
      new UserId(userId),
      new ProposalId(proposalId),
      new CreatedAt(createdAt),
      new ReplyProposalHistoryEntrieMessage(message)
    )

    // Check not already exists
    if (await this.replyProposalHistoryEntrieRepository.existsWithId(new ProposalHistoryEntrieId(id)))
      throw new ReplyProposalHistoryEntrieAlreadyExistsWithIdError(id)

    // Check user and proposal existance
    await this.userFinder.findById(new UserId(userId))
    await this.proposalFinder.findById(new ProposalId(proposalId))

    return this.replyProposalHistoryEntrieRepository.create(reply)
  }
}