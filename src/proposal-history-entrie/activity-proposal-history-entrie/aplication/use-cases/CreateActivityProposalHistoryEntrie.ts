import { ProposalHistoryEntrieId } from "@/proposal-history-entrie/domain/value-objects/ProposalHistoryEntrieId";
import { ProposalRepository } from "@/proposal/domain/repositories/ProposalRepository";
import { ProposalFinder } from "@/proposal/domain/services/ProposalFinder";
import { ProposalId } from "@/proposal/domain/value-objects/ProposalId";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserFinder } from "@/user/domain/services/UserFinder";
import { UserId } from "@/user/domain/value-objects/UserId";
import { ActivityProposalHistoryEntrie } from "../../domain/ActivityProposalHistoryEntrie";
import { ActivityProposalHistoryEntrieRepository } from "../../domain/repositories/ActivityProposalHistoryEntrieRepository";
import { ActivityProposalHistoryEntrieAlreadyExistsWithIdError } from "../../domain/errors/ActivityProposalHistoryEntrieAlreadyExistsWithIdError";

export class CreateActivityProposalHistoryEntrie {
  private readonly userFinder: UserFinder
  private readonly proposalFinder: ProposalFinder
  constructor(
    private activityProposalHistoryEntrieRepository: ActivityProposalHistoryEntrieRepository,
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
    createdAt: Date
  ) {
    const activity = new ActivityProposalHistoryEntrie(
      new ProposalHistoryEntrieId(id),
      new UserId(userId),
      new ProposalId(proposalId),
      new CreatedAt(createdAt)
    )

    // Check not already exists
    if(await this.activityProposalHistoryEntrieRepository.existsWithId(new ProposalHistoryEntrieId(id)))
      throw new ActivityProposalHistoryEntrieAlreadyExistsWithIdError(id)

    // Check user and proposal existance
    await this.userFinder.findById(new UserId(userId))
    await this.proposalFinder.findById(new ProposalId(proposalId))

    return this.activityProposalHistoryEntrieRepository.create(activity)
  }
}