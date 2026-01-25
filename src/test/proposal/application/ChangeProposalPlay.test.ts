import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChangeProposalPlay } from "../../../proposal/application/use-cases/ChangeProposalPlay.ts";
import { ProposalNotFoundByIdError } from "../../../proposal/domain/errors/ProposalNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { TWO_STEP_PROPOSAL } from "../../../shared/utils/domain/fixtures/proposals.ts";
import { PEDRO_MARTINEZ } from "../../../shared/utils/domain/fixtures/users.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";

describe("Change proposal play use case tests", () => {
  beforeEach(() => {
    const mockProposal = {
      ...TWO_STEP_PROPOSAL,
      userId: new UserId(TWO_STEP_PROPOSAL.userId),
      changePlay: vi.fn(),
    };
    proposalRepo.getOneById = vi.fn().mockResolvedValue(mockProposal);
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

  const changeProposalPlay = new ChangeProposalPlay(proposalRepo);

  it("Should change a proposal play successfully", async () => {
    await changeProposalPlay.run(
      TWO_STEP_PROPOSAL.id,
      TWO_STEP_PROPOSAL.play,
      TWO_STEP_PROPOSAL.userId,
    );
    expect(proposalRepo.edit).toBeCalledTimes(1);
  });

  it("should not change a proposal play if user does not own it", async () => {
    await expect(
      async () =>
        await changeProposalPlay.run(
          TWO_STEP_PROPOSAL.id,
          TWO_STEP_PROPOSAL.play,
          PEDRO_MARTINEZ.id,
        ),
    ).rejects.toThrow(UnauthorizedUserActionError);
  });

  it("should not change a proposal play if it does not exist", async () => {
    proposalRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await changeProposalPlay.run(
          TWO_STEP_PROPOSAL.id,
          TWO_STEP_PROPOSAL.play,
          TWO_STEP_PROPOSAL.userId,
        ),
    ).rejects.toThrow(ProposalNotFoundByIdError);
  });
});
