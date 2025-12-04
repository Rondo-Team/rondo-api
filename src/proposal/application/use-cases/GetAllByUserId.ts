import type { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";

export class GetAllByUserId {
  private proposalRepository: ProposalRepository;
  private readonly userFinder: UserFinder;
  constructor(
    proposalRepository: ProposalRepository,
    userRepository: UserRepository
  ) {
    this.proposalRepository = proposalRepository;
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string) {
    const userId = new UserId(id);
    await this.userFinder.findById(userId);

    return this.proposalRepository.getAllByUserId(userId);
  }
}
