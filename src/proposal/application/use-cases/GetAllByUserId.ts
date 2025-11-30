import { ProposalRepository } from "@/proposal/domain/repositories/ProposalRepository";
import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserFinder } from "@/user/domain/services/UserFinder";
import { UserId } from "@/user/domain/value-objects/UserId";

export class GetAllByUserId {
  private readonly userFinder: UserFinder
  constructor(
    private proposalRepository: ProposalRepository,
    userRepository: UserRepository
  ) {
    this.userFinder = new UserFinder(userRepository)
  }

  async run(
    id: string,
  ) {
    const userId = new UserId(id)
    await this.userFinder.findById(userId)

    return this.proposalRepository.getAllByUserId(userId);
  }
}