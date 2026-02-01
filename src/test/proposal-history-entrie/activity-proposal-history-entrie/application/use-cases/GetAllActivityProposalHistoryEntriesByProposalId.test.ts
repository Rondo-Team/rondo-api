import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetAllActivityProposalHistoryEntriesByProposalId } from "../../../../../proposal-history-entrie/activity-proposal-history-entrie/aplication/use-cases/GetAllActivityProposalHistoryEntriesByProposalId.ts";
import { ProposalNotFoundByIdError } from "../../../../../proposal/domain/errors/ProposalNotFoundByIdError.ts";
import { ACTIVITY_PROPOSAL_HISTORY_ENTRIE } from "../../../../../shared/utils/domain/fixtures/activityHistoryEntrie.ts";
import { TWO_STEP_PROPOSAL } from "../../../../../shared/utils/domain/fixtures/proposals.ts";


describe("Get all activity proposal history entries by proposal id use case tests", () => {
  const activityRepo = {
    create: vi.fn(),
    existsWithId: vi.fn(),
    getAllByProposalId: vi.fn(),
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

  const getAllActivityProposalHistoryEntriesByProposalId =
    new GetAllActivityProposalHistoryEntriesByProposalId(
      activityRepo,
      proposalRepo,
    );

  const mockProposal = {
    ...TWO_STEP_PROPOSAL,
  };

  const mockActivities = [ACTIVITY_PROPOSAL_HISTORY_ENTRIE];

  beforeEach(() => {
    proposalRepo.getOneById = vi.fn().mockResolvedValue(mockProposal);
    activityRepo.getAllByProposalId = vi.fn().mockResolvedValue(mockActivities);
  });

  it("Should get all activity proposal history entries by proposal id successfully", async () => {
    const result = await getAllActivityProposalHistoryEntriesByProposalId.run(
      ACTIVITY_PROPOSAL_HISTORY_ENTRIE.proposalId,
    );

    expect(proposalRepo.getOneById).toBeCalledTimes(1);
    expect(activityRepo.getAllByProposalId).toBeCalledTimes(1);
    expect(result).toEqual(mockActivities);
  });

  it("should not get activities if proposal does not exist", async () => {
    proposalRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await getAllActivityProposalHistoryEntriesByProposalId.run(
          ACTIVITY_PROPOSAL_HISTORY_ENTRIE.proposalId,
        ),
    ).rejects.toThrow(ProposalNotFoundByIdError);
  });
});