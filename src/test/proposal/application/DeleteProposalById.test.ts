import { beforeEach, describe, expect, it, vi } from "vitest";
import { DeleteProposalById } from "../../../proposal/application/use-cases/DeleteProposalById.ts";
import { ProposalNotFoundByIdError } from "../../../proposal/domain/errors/ProposalNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { TWO_STEP_PROPOSAL } from "../../../shared/utils/domain/fixtures/proposals.ts";
import { PEDRO_MARTINEZ } from "../../../shared/utils/domain/fixtures/users.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";

describe("Delete proposal by id use case tests", () => {
  beforeEach(() => {
    const mockProposal = {
      ...TWO_STEP_PROPOSAL,
      userId: new UserId(TWO_STEP_PROPOSAL.userId),
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

  const deleteProposalById = new DeleteProposalById(proposalRepo);

  it("Should delete a proposal successfully", async () => {
    await deleteProposalById.run(
      TWO_STEP_PROPOSAL.id,
      TWO_STEP_PROPOSAL.userId,
    );
    expect(proposalRepo.deleteById).toBeCalledTimes(1);
  });

  it("should not delete a proposal if user does not own it", async () => {
    await expect(
      async () =>
        await deleteProposalById.run(TWO_STEP_PROPOSAL.id, PEDRO_MARTINEZ.id),
    ).rejects.toThrow(UnauthorizedUserActionError);
  });

  it("should not delete a proposal if it does not exist", async () => {
    proposalRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await deleteProposalById.run(
          TWO_STEP_PROPOSAL.id,
          TWO_STEP_PROPOSAL.userId,
        ),
    ).rejects.toThrow(ProposalNotFoundByIdError);
  });
});
