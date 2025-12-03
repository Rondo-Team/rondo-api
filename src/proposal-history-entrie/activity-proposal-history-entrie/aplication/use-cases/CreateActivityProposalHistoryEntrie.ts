import { ProposalRepository } from "../../../../proposal/domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../../../proposal/domain/services/ProposalFinder.ts";
import { ProposalId } from "../../../../proposal/domain/value-objects/ProposalId.ts";
import { CreatedAt } from "../../../../shared/domain/value-objects/CreatedAt.ts";
import { UserRepository } from "../../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";
import { ProposalHistoryEntrieId } from "../../../domain/value-objects/ProposalHistoryEntrieId.ts";
import { ActivityProposalHistoryEntrie } from "../../domain/ActivityProposalHistoryEntrie.ts";
import { ActivityProposalHistoryEntrieAlreadyExistsWithIdError } from "../../domain/errors/ActivityProposalHistoryEntrieAlreadyExistsWithIdError.ts";
import { ActivityProposalHistoryEntrieRepository } from "../../domain/repositories/ActivityProposalHistoryEntrieRepository.ts";

export class CreateActivityProposalHistoryEntrie {
  private readonly userFinder: UserFinder;
  private readonly proposalFinder: ProposalFinder;
  constructor(
    private activityProposalHistoryEntrieRepository: ActivityProposalHistoryEntrieRepository,
    userRepository: UserRepository,
    proposalRepository: ProposalRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
    this.proposalFinder = new ProposalFinder(proposalRepository);
  }

  async run(id: string, proposalId: string, userId: string, createdAt: Date) {
    const activity = new ActivityProposalHistoryEntrie(
      new ProposalHistoryEntrieId(id),
      new ProposalId(proposalId),
      new UserId(userId),
      new CreatedAt(createdAt)
    );

    // Check not already exists
    if (
      await this.activityProposalHistoryEntrieRepository.existsWithId(
        new ProposalHistoryEntrieId(id)
      )
    )
      throw new ActivityProposalHistoryEntrieAlreadyExistsWithIdError(id);

    // Check user and proposal existance
    await this.userFinder.findById(new UserId(userId));
    await this.proposalFinder.findById(new ProposalId(proposalId));

    return this.activityProposalHistoryEntrieRepository.create(activity);
  }
}
