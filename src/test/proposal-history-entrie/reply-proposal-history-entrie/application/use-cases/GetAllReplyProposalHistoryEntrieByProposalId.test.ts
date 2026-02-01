import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetAllReplyProposalHistoryEntriesByProposalId } from "../../../../../proposal-history-entrie/reply-proposal-history-entrie/aplication/use-cases/GetAllReplyProposalHistoryEntrieByProposalId.ts";
import { ProposalNotFoundByIdError } from "../../../../../proposal/domain/errors/ProposalNotFoundByIdError.ts";
import { REPLY_PROPOSAL_HISTORY_ENTRIE } from "../../../../../shared/utils/domain/fixtures/replyHistoryEntrie.ts";
import { TWO_STEP_PROPOSAL } from "../../../../../shared/utils/domain/fixtures/proposals.ts";

describe("Get all reply proposal history entries by proposal id use case tests", () => {
  const replyRepo = {
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

  const getAllReplyProposalHistoryEntriesByProposalId =
    new GetAllReplyProposalHistoryEntriesByProposalId(
      replyRepo,
      proposalRepo,
    );

  const mockProposal = {
    ...TWO_STEP_PROPOSAL,
  };

  const mockReplies = [REPLY_PROPOSAL_HISTORY_ENTRIE];

  beforeEach(() => {
    proposalRepo.getOneById = vi.fn().mockResolvedValue(mockProposal);
    replyRepo.getAllByProposalId = vi.fn().mockResolvedValue(mockReplies);
  });

  it("Should get all reply proposal history entries by proposal id successfully", async () => {
    const result = await getAllReplyProposalHistoryEntriesByProposalId.run(
      REPLY_PROPOSAL_HISTORY_ENTRIE.proposalId,
    );

    expect(proposalRepo.getOneById).toBeCalledTimes(1);
    expect(replyRepo.getAllByProposalId).toBeCalledTimes(1);
    expect(result).toEqual(mockReplies);
  });

  it("should not get replies if proposal does not exist", async () => {
    proposalRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await getAllReplyProposalHistoryEntriesByProposalId.run(
          REPLY_PROPOSAL_HISTORY_ENTRIE.proposalId,
        ),
    ).rejects.toThrow(ProposalNotFoundByIdError);
  });
});