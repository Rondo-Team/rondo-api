import { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";

export class GetAllByUserId {
  private readonly userFinder: UserFinder;
  constructor(
    private proposalRepository: ProposalRepository,
    userRepository: UserRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string) {
    const userId = new UserId(id);
    await this.userFinder.findById(userId);

    return this.proposalRepository.getAllByUserId(userId);
  }
}
