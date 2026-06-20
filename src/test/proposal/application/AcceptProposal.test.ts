import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostNotFoundByIdError } from "../../../post/domain/errors/PostNotFoundByIdError.ts";
import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { AcceptProposal } from "../../../proposal/application/use-cases/AcceptProposal.ts";
import { ProposalIsAlreadyClosedError } from "../../../proposal/domain/errors/ProposalIsAlreadyClosedError.ts";
import { ProposalNotFoundByIdError } from "../../../proposal/domain/errors/ProposalNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { ONE_STEP_POST } from "../../../shared/utils/domain/fixtures/posts.ts";
import { TWO_STEP_PROPOSAL } from "../../../shared/utils/domain/fixtures/proposals.ts";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../shared/utils/domain/fixtures/users.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";

describe("Accept proposal use case tests", () => {
  beforeEach(() => {
    const mockProposal = {
      ...TWO_STEP_PROPOSAL,
      userId: new UserId(TWO_STEP_PROPOSAL.userId),
      postId: new PostId(TWO_STEP_PROPOSAL.postId),
      isClosed: vi.fn().mockReturnValue(false),
      accept: vi.fn(),
    };
    const mockPost = {
      ...ONE_STEP_POST,
      userId: new UserId(ONE_STEP_POST.userId),
      changePlay: vi.fn(),
    };

    proposalRepo.getOneById = vi.fn().mockResolvedValue(mockProposal);
    postRepo.getOneById = vi.fn().mockResolvedValue(mockPost);
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

  const acceptProposal = new AcceptProposal(proposalRepo, postRepo);

  it("Should accept a proposal successfully", async () => {
    await acceptProposal.run(TWO_STEP_PROPOSAL.id, MANOLO_LOPEZ.id);

    expect(postRepo.edit).toBeCalledTimes(1);
    expect(proposalRepo.edit).toBeCalledTimes(1);
  });

  it("Should delegate the acceptance to the proposal aggregate", async () => {
    const mockProposal = {
      ...TWO_STEP_PROPOSAL,
      userId: new UserId(TWO_STEP_PROPOSAL.userId),
      postId: new PostId(TWO_STEP_PROPOSAL.postId),
      isClosed: vi.fn().mockReturnValue(false),
      accept: vi.fn(),
    };
    proposalRepo.getOneById = vi.fn().mockResolvedValue(mockProposal);

    await acceptProposal.run(TWO_STEP_PROPOSAL.id, MANOLO_LOPEZ.id);

    expect(mockProposal.accept).toBeCalledTimes(1);
    const [actorUserId] = mockProposal.accept.mock.calls[0];
    expect(actorUserId.value).toBe(MANOLO_LOPEZ.id);
  });

  it("should not accept a proposal if proposal does not exist", async () => {
    proposalRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await acceptProposal.run(TWO_STEP_PROPOSAL.id, MANOLO_LOPEZ.id),
    ).rejects.toThrow(ProposalNotFoundByIdError);
  });

  it("should not accept a proposal if post does not exist", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await acceptProposal.run(TWO_STEP_PROPOSAL.id, MANOLO_LOPEZ.id),
    ).rejects.toThrow(PostNotFoundByIdError);
  });

  it("should not accept a proposal if user is not the post owner", async () => {
    await expect(
      async () =>
        await acceptProposal.run(TWO_STEP_PROPOSAL.id, PEDRO_MARTINEZ.id),
    ).rejects.toThrow(UnauthorizedUserActionError);
  });

  it("should not accept a proposal if it is already closed", async () => {
    const closedProposal = {
      ...TWO_STEP_PROPOSAL,
      userId: new UserId(TWO_STEP_PROPOSAL.userId),
      postId: new PostId(TWO_STEP_PROPOSAL.postId),
      isClosed: vi.fn().mockReturnValue(true),
      accept: vi.fn(),
    };

    proposalRepo.getOneById = vi.fn().mockResolvedValue(closedProposal);

    await expect(
      async () =>
        await acceptProposal.run(TWO_STEP_PROPOSAL.id, MANOLO_LOPEZ.id),
    ).rejects.toThrow(ProposalIsAlreadyClosedError);
  });
});
