import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostNotFoundByIdError } from "../../../post/domain/errors/PostNotFoundByIdError.ts";
import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { ReplyProposal } from "../../../proposal/application/use-cases/ReplyProposal.ts";
import { ProposalNotFoundByIdError } from "../../../proposal/domain/errors/ProposalNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { ONE_STEP_POST } from "../../../shared/utils/domain/fixtures/posts.ts";
import { TWO_STEP_PROPOSAL } from "../../../shared/utils/domain/fixtures/proposals.ts";
import { REPLY_PROPOSAL_HISTORY_ENTRIE } from "../../../shared/utils/domain/fixtures/replyHistoryEntrie.ts";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../shared/utils/domain/fixtures/users.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";

describe("Reply proposal use case tests", () => {
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

  const postRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    getAll: vi.fn(),
    getAllByUserId: vi.fn(),
    existsWithId: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
    getByCriteria: vi.fn(),
  };

  const replyProposal = new ReplyProposal(proposalRepo, postRepo);

  beforeEach(() => {
    vi.clearAllMocks();
    const mockProposal = {
      ...TWO_STEP_PROPOSAL,
      userId: new UserId(TWO_STEP_PROPOSAL.userId),
      postId: new PostId(TWO_STEP_PROPOSAL.postId),
      isOwnedBy: vi
        .fn()
        .mockImplementation(
          (user: UserId) => user.toPrimitives() === TWO_STEP_PROPOSAL.userId,
        ),
      reply: vi.fn(),
    };
    const mockPost = {
      ...ONE_STEP_POST,
      userId: new UserId(ONE_STEP_POST.userId),
      isOwnedBy: vi
        .fn()
        .mockImplementation(
          (user: UserId) => user.toPrimitives() === ONE_STEP_POST.userId,
        ),
    };

    proposalRepo.getOneById = vi.fn().mockResolvedValue(mockProposal);
    postRepo.getOneById = vi.fn().mockResolvedValue(mockPost);
  });

  it("Should reply to a proposal successfully", async () => {
    await replyProposal.run(
      TWO_STEP_PROPOSAL.id,
      MANOLO_LOPEZ.id,
      REPLY_PROPOSAL_HISTORY_ENTRIE.message,
    );

    expect(proposalRepo.edit).toBeCalledTimes(1);
  });

  it("Should delegate the reply to the proposal aggregate", async () => {
    const mockProposal = {
      ...TWO_STEP_PROPOSAL,
      userId: new UserId(TWO_STEP_PROPOSAL.userId),
      postId: new PostId(TWO_STEP_PROPOSAL.postId),
      isOwnedBy: vi.fn().mockReturnValue(true),
      reply: vi.fn(),
    };
    proposalRepo.getOneById = vi.fn().mockResolvedValue(mockProposal);

    await replyProposal.run(
      TWO_STEP_PROPOSAL.id,
      MANOLO_LOPEZ.id,
      REPLY_PROPOSAL_HISTORY_ENTRIE.message,
    );

    expect(mockProposal.reply).toBeCalledTimes(1);
    const [actorUserId, , message] = mockProposal.reply.mock.calls[0];
    expect(actorUserId.value).toBe(MANOLO_LOPEZ.id);
    expect(message.value).toBe(REPLY_PROPOSAL_HISTORY_ENTRIE.message);
  });

  it("Should allow the post owner to reply even if they do not own the proposal", async () => {
    const mockProposal = {
      ...TWO_STEP_PROPOSAL,
      userId: new UserId(TWO_STEP_PROPOSAL.userId),
      postId: new PostId(TWO_STEP_PROPOSAL.postId),
      isOwnedBy: vi.fn().mockReturnValue(false),
      reply: vi.fn(),
    };
    const mockPost = {
      ...ONE_STEP_POST,
      userId: new UserId(ONE_STEP_POST.userId),
      isOwnedBy: vi.fn().mockReturnValue(true),
    };
    proposalRepo.getOneById = vi.fn().mockResolvedValue(mockProposal);
    postRepo.getOneById = vi.fn().mockResolvedValue(mockPost);

    await replyProposal.run(
      TWO_STEP_PROPOSAL.id,
      MANOLO_LOPEZ.id,
      REPLY_PROPOSAL_HISTORY_ENTRIE.message,
    );

    expect(mockProposal.reply).toBeCalledTimes(1);
    expect(proposalRepo.edit).toBeCalledTimes(1);
  });

  it("should not reply to a proposal if proposal does not exist", async () => {
    proposalRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await replyProposal.run(
          TWO_STEP_PROPOSAL.id,
          MANOLO_LOPEZ.id,
          REPLY_PROPOSAL_HISTORY_ENTRIE.message,
        ),
    ).rejects.toThrow(ProposalNotFoundByIdError);
  });

  it("should not reply to a proposal if post does not exist", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await replyProposal.run(
          TWO_STEP_PROPOSAL.id,
          MANOLO_LOPEZ.id,
          REPLY_PROPOSAL_HISTORY_ENTRIE.message,
        ),
    ).rejects.toThrow(PostNotFoundByIdError);
  });

  it("should not reply to a proposal if user is neither the proposal nor the post owner", async () => {
    await expect(
      async () =>
        await replyProposal.run(
          TWO_STEP_PROPOSAL.id,
          PEDRO_MARTINEZ.id,
          REPLY_PROPOSAL_HISTORY_ENTRIE.message,
        ),
    ).rejects.toThrow(UnauthorizedUserActionError);
  });
});
