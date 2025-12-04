import type { ProposalRepository } from "../../../../proposal/domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../../../proposal/domain/services/ProposalFinder.ts";
import { ProposalId } from "../../../../proposal/domain/value-objects/ProposalId.ts";
import { CreatedAt } from "../../../../shared/domain/value-objects/CreatedAt.ts";
import type { UserRepository } from "../../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";
import { ProposalHistoryEntrieId } from "../../../domain/value-objects/ProposalHistoryEntrieId.ts";
import { ActivityProposalHistoryEntrie } from "../../domain/ActivityProposalHistoryEntrie.ts";
import { ActivityProposalHistoryEntrieAlreadyExistsWithIdError } from "../../domain/errors/ActivityProposalHistoryEntrieAlreadyExistsWithIdError.ts";
import type { ActivityProposalHistoryEntrieRepository } from "../../domain/repositories/ActivityProposalHistoryEntrieRepository.ts";

export class CreateActivityProposalHistoryEntrie {
  private activityProposalHistoryEntrieRepository: ActivityProposalHistoryEntrieRepository;
  private readonly userFinder: UserFinder;
  private readonly proposalFinder: ProposalFinder;
  constructor(
    activityProposalHistoryEntrieRepository: ActivityProposalHistoryEntrieRepository,
    userRepository: UserRepository,
    proposalRepository: ProposalRepository
  ) {
    this.activityProposalHistoryEntrieRepository =
      activityProposalHistoryEntrieRepository;
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
