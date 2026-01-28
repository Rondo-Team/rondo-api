import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateActivityProposalHistoryEntrie } from "../../../../../proposal-history-entrie/activity-proposal-history-entrie/aplication/use-cases/CreateActivityProposalHistoryEntrie.ts";
import { ActivityProposalHistoryEntrieAlreadyExistsWithIdError } from "../../../../../proposal-history-entrie/activity-proposal-history-entrie/domain/errors/ActivityProposalHistoryEntrieAlreadyExistsWithIdError.ts";
import { ProposalNotFoundByIdError } from "../../../../../proposal/domain/errors/ProposalNotFoundByIdError.ts";
import { ACTIVITY_PROPOSAL_HISTORY_ENTRIE } from "../../../../../shared/utils/domain/fixtures/activityHistoryEntrie.ts";
import { TWO_STEP_PROPOSAL } from "../../../../../shared/utils/domain/fixtures/proposals.ts";
import { MANOLO_LOPEZ } from "../../../../../shared/utils/domain/fixtures/users.ts";
import { UserNotFoundByIdError } from "../../../../../user/domain/errors/UserNotFoundByIdError.ts";

describe("Create activity proposal history entrie use case tests", () => {
  const activityRepo = {
    create: vi.fn(),
    existsWithId: vi.fn(),
    getAllByProposalId: vi.fn(),
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

  const createActivityProposalHistoryEntrie =
    new CreateActivityProposalHistoryEntrie(
      activityRepo,
      userRepo,
      proposalRepo,
    );

  const mockUser = {
    ...MANOLO_LOPEZ,
  };

  const mockProposal = {
    ...TWO_STEP_PROPOSAL,
  };

  beforeEach(() => {
    activityRepo.existsWithId = vi.fn().mockResolvedValue(false);
    userRepo.getOneById = vi.fn().mockResolvedValue(mockUser);
    userRepo.existsWithId = vi.fn().mockResolvedValue(true);
    proposalRepo.getOneById = vi.fn().mockResolvedValue(mockProposal);
  });

  it("Should create an activity proposal history entrie successfully", async () => {
    await createActivityProposalHistoryEntrie.run(
      ACTIVITY_PROPOSAL_HISTORY_ENTRIE.id,
      ACTIVITY_PROPOSAL_HISTORY_ENTRIE.proposalId,
      ACTIVITY_PROPOSAL_HISTORY_ENTRIE.userId,
      ACTIVITY_PROPOSAL_HISTORY_ENTRIE.createdAt,
    );
    expect(activityRepo.create).toBeCalledTimes(1);
  });

  it("should not create an activity if id already exists", async () => {
    activityRepo.existsWithId = vi.fn().mockResolvedValue(true);

    await expect(
      async () =>
        await createActivityProposalHistoryEntrie.run(
          ACTIVITY_PROPOSAL_HISTORY_ENTRIE.id,
          ACTIVITY_PROPOSAL_HISTORY_ENTRIE.proposalId,
          ACTIVITY_PROPOSAL_HISTORY_ENTRIE.userId,
          ACTIVITY_PROPOSAL_HISTORY_ENTRIE.createdAt,
        ),
    ).rejects.toThrow(ActivityProposalHistoryEntrieAlreadyExistsWithIdError);
  });

  it("should not create an activity if user does not exist", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await createActivityProposalHistoryEntrie.run(
          ACTIVITY_PROPOSAL_HISTORY_ENTRIE.id,
          ACTIVITY_PROPOSAL_HISTORY_ENTRIE.proposalId,
          ACTIVITY_PROPOSAL_HISTORY_ENTRIE.userId,
          ACTIVITY_PROPOSAL_HISTORY_ENTRIE.createdAt,
        ),
    ).rejects.toThrow(UserNotFoundByIdError);
  });

  it("should not create an activity if proposal does not exist", async () => {
    proposalRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await createActivityProposalHistoryEntrie.run(
          ACTIVITY_PROPOSAL_HISTORY_ENTRIE.id,
          ACTIVITY_PROPOSAL_HISTORY_ENTRIE.proposalId,
          ACTIVITY_PROPOSAL_HISTORY_ENTRIE.userId,
          ACTIVITY_PROPOSAL_HISTORY_ENTRIE.createdAt,
        ),
    ).rejects.toThrow(ProposalNotFoundByIdError);
  });
});
