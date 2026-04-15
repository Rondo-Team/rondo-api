import type { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { ProposalReadModelRepository } from "../../domain/repositories/ProposalReadModelRepository.ts";

export class GetAllProposalsByUserId {
  private proposalReadModelRepository: ProposalReadModelRepository;
  private readonly userFinder: UserFinder;
  constructor(
    proposalReadModelRepository: ProposalReadModelRepository,
    userRepository: UserRepository,
  ) {
    this.proposalReadModelRepository = proposalReadModelRepository;
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string) {
    const userId = new UserId(id);
    await this.userFinder.findById(userId);

    return this.proposalReadModelRepository.getAllByUserId(userId);
  }
}
