import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetProposalById } from "../../../proposal/application/use-cases/GetProposalById.ts";
import { ProposalNotFoundByIdError } from "../../../proposal/domain/errors/ProposalNotFoundByIdError.ts";
import { ProposalId } from "../../../proposal/domain/value-objects/ProposalId.ts";
import { TWO_STEP_PROPOSAL } from "../../../shared/utils/domain/fixtures/proposals.ts";

describe("Get proposal by id use case tests", () => {
  beforeEach(() => {
    const mockProposal = {
      ...TWO_STEP_PROPOSAL,
      proposalId: new ProposalId(TWO_STEP_PROPOSAL.id),
    };
    proposalRepo.getOneById = vi.fn().mockResolvedValue(mockProposal);
    proposalRepo.existsWithId = vi.fn().mockResolvedValue(false);
  });

  const proposalRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    getAll: vi.fn(),
    getAllByUserId: vi.fn(),
    getAllByPostId: vi.fn(),
    existsWithId: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
    getByCriteria: vi.fn(),
  };

  const getProposalById = new GetProposalById(proposalRepo);

  it("Should get a proposal successfully", async () => {
    await getProposalById.run(TWO_STEP_PROPOSAL.id);
    expect(proposalRepo.getOneById).toBeCalledTimes(1);
  });

  it("should not get a proposal if it does not exist", async () => {
    proposalRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () => await getProposalById.run(TWO_STEP_PROPOSAL.id),
    ).rejects.toThrow(ProposalNotFoundByIdError);
  });
});
