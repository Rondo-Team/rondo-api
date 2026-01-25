import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetAllProposalsByUserId } from "../../../proposal/application/use-cases/GetAllProposalsByUserId.ts";
import { ProposalId } from "../../../proposal/domain/value-objects/ProposalId.ts";
import { TWO_STEP_PROPOSAL } from "../../../shared/utils/domain/fixtures/proposals.ts";
import { MANOLO_LOPEZ } from "../../../shared/utils/domain/fixtures/users.ts";
import { UserNotFoundByIdError } from "../../../user/domain/errors/UserNotFoundByIdError.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";

describe("Get all proposals by user id use case tests", () => {
  beforeEach(() => {
    const mockProposal = {
      ...TWO_STEP_PROPOSAL,
      proposalId: new ProposalId(TWO_STEP_PROPOSAL.id),
      userId: new UserId(MANOLO_LOPEZ.id),
    };
    proposalRepo.getAllByUserId = vi.fn().mockResolvedValue([mockProposal]);
    userRepo.getOneById = vi.fn().mockResolvedValue(MANOLO_LOPEZ);
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

  const userRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    getOneByEmail: vi.fn(),
    existsWithId: vi.fn(),
    existsWithEmail: vi.fn(),
    existsWithUsername: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
  };

  const getAllProposalsByUserId = new GetAllProposalsByUserId(
    proposalRepo,
    userRepo,
  );

  it("Should get all proposals successfully", async () => {
    await getAllProposalsByUserId.run(MANOLO_LOPEZ.id);
    expect(proposalRepo.getAllByUserId).toBeCalledTimes(1);
  });

  it("should not get proposals for a non existing user", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () => await getAllProposalsByUserId.run(MANOLO_LOPEZ.id),
    ).rejects.toThrow(UserNotFoundByIdError);
  });
});
