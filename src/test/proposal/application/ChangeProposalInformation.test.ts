import { beforeEach, describe, expect, it, vi } from "vitest";

import { ChangeProposalInformation } from "../../../proposal/application/use-cases/ChangeProposalInformation.ts";
import { ProposalNotFoundByIdError } from "../../../proposal/domain/errors/ProposalNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { TWO_STEP_PROPOSAL } from "../../../shared/utils/domain/fixtures/proposals.ts";
import { PEDRO_MARTINEZ } from "../../../shared/utils/domain/fixtures/users.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";

describe("Change proposal information use case tests", () => {
  beforeEach(() => {
    const mockProposal = {
      ...TWO_STEP_PROPOSAL,
      userId: new UserId(TWO_STEP_PROPOSAL.userId),
      changeTitle: vi.fn(),
      changeDescription: vi.fn(),
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

  const changeProposalInformation = new ChangeProposalInformation(proposalRepo);

  it("Should change a post information succesfully", async () => {
    await changeProposalInformation.run(
      TWO_STEP_PROPOSAL.id,
      TWO_STEP_PROPOSAL.userId,
      TWO_STEP_PROPOSAL.title,
      TWO_STEP_PROPOSAL.description,
    );
    expect(proposalRepo.edit).toBeCalledTimes(1);
  });

  it("should not change a post information if user does not own it", async () => {
    await expect(
      async () =>
        await changeProposalInformation.run(
          TWO_STEP_PROPOSAL.id,
          PEDRO_MARTINEZ.id,
          TWO_STEP_PROPOSAL.title,
          TWO_STEP_PROPOSAL.description,
        ),
    ).rejects.toThrow(UnauthorizedUserActionError);
  });

  it("should not change a post information if it does not exist", async () => {
    proposalRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await changeProposalInformation.run(
          TWO_STEP_PROPOSAL.id,
          TWO_STEP_PROPOSAL.userId,
          TWO_STEP_PROPOSAL.title,
          TWO_STEP_PROPOSAL.description,
        ),
    ).rejects.toThrow(ProposalNotFoundByIdError);
  });
});
