import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateReplyProposalHistoryEntrie } from "../../../../../proposal-history-entrie/reply-proposal-history-entrie/aplication/use-cases/CreateReplyProposalHistoryEntrie.ts";
import { ReplyProposalHistoryEntrieAlreadyExistsWithIdError } from "../../../../../proposal-history-entrie/reply-proposal-history-entrie/domain/errors/ReplyProposalHistoryEntrieAlreadyExistsWithIdError.ts";
import { ProposalNotFoundByIdError } from "../../../../../proposal/domain/errors/ProposalNotFoundByIdError.ts";
import { TWO_STEP_PROPOSAL } from "../../../../../shared/utils/domain/fixtures/proposals.ts";
import { REPLY_PROPOSAL_HISTORY_ENTRIE } from "../../../../../shared/utils/domain/fixtures/replyHistoryEntrie.ts";
import { MANOLO_LOPEZ } from "../../../../../shared/utils/domain/fixtures/users.ts";
import { UserNotFoundByIdError } from "../../../../../user/domain/errors/UserNotFoundByIdError.ts";

describe("Create reply proposal history entrie use case tests", () => {
  const replyRepo = {
    create: vi.fn(),
    existsWithId: vi.fn(),
    getAllByProposalId: vi.fn(),
    deleteById: vi.fn(),
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

  const createReplyProposalHistoryEntrie = new CreateReplyProposalHistoryEntrie(
    replyRepo,
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
    replyRepo.existsWithId = vi.fn().mockResolvedValue(false);
    userRepo.getOneById = vi.fn().mockResolvedValue(mockUser);
    userRepo.existsWithId = vi.fn().mockResolvedValue(true);
    proposalRepo.getOneById = vi.fn().mockResolvedValue(mockProposal);
  });

  it("Should create a reply proposal history entrie successfully", async () => {
    await createReplyProposalHistoryEntrie.run(
      REPLY_PROPOSAL_HISTORY_ENTRIE.id,
      REPLY_PROPOSAL_HISTORY_ENTRIE.proposalId,
      REPLY_PROPOSAL_HISTORY_ENTRIE.userId,
      REPLY_PROPOSAL_HISTORY_ENTRIE.createdAt,
      REPLY_PROPOSAL_HISTORY_ENTRIE.message,
    );
    expect(replyRepo.create).toBeCalledTimes(1);
  });

  it("should not create a reply if id already exists", async () => {
    replyRepo.existsWithId = vi.fn().mockResolvedValue(true);

    await expect(
      async () =>
        await createReplyProposalHistoryEntrie.run(
          REPLY_PROPOSAL_HISTORY_ENTRIE.id,
          REPLY_PROPOSAL_HISTORY_ENTRIE.proposalId,
          REPLY_PROPOSAL_HISTORY_ENTRIE.userId,
          REPLY_PROPOSAL_HISTORY_ENTRIE.createdAt,
          REPLY_PROPOSAL_HISTORY_ENTRIE.message,
        ),
    ).rejects.toThrow(ReplyProposalHistoryEntrieAlreadyExistsWithIdError);
  });

  it("should not create a reply if user does not exist", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await createReplyProposalHistoryEntrie.run(
          REPLY_PROPOSAL_HISTORY_ENTRIE.id,
          REPLY_PROPOSAL_HISTORY_ENTRIE.proposalId,
          REPLY_PROPOSAL_HISTORY_ENTRIE.userId,
          REPLY_PROPOSAL_HISTORY_ENTRIE.createdAt,
          REPLY_PROPOSAL_HISTORY_ENTRIE.message,
        ),
    ).rejects.toThrow(UserNotFoundByIdError);
  });

  it("should not create a reply if proposal does not exist", async () => {
    proposalRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await createReplyProposalHistoryEntrie.run(
          REPLY_PROPOSAL_HISTORY_ENTRIE.id,
          REPLY_PROPOSAL_HISTORY_ENTRIE.proposalId,
          REPLY_PROPOSAL_HISTORY_ENTRIE.userId,
          REPLY_PROPOSAL_HISTORY_ENTRIE.createdAt,
          REPLY_PROPOSAL_HISTORY_ENTRIE.message,
        ),
    ).rejects.toThrow(ProposalNotFoundByIdError);
  });
});
