import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../domain/services/ProposalFinder.ts";
import { ProposalId } from "../../domain/value-objects/ProposalId.ts";

export class DeleteProposalById {
  private proposalRepository: ProposalRepository;
  private readonly proposalFinder: ProposalFinder;
  private resourceAccessChecker: ResourceAccessChecker;
  constructor(proposalRepository: ProposalRepository) {
    this.proposalRepository = proposalRepository;
    this.proposalFinder = new ProposalFinder(proposalRepository);
    this.resourceAccessChecker = new ResourceAccessChecker();
  }

  async run(id: string, actorId: string) {
    const proposalId = new ProposalId(id);
    const proposal = await this.proposalFinder.findById(proposalId);
    await this.resourceAccessChecker.check(
      UserId.fromPrimitives(actorId),
      proposal.userId,
    );

    return this.proposalRepository.deleteById(proposalId);
  }
}
