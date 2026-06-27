import { beforeEach, describe, expect, it, vi } from "vitest";
import { Post } from "../../../post/domain/Post.ts";
import { DeleteProposalById } from "../../../proposal/application/use-cases/DeleteProposalById.ts";
import { ProposalNotFoundByIdError } from "../../../proposal/domain/errors/ProposalNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { ONE_STEP_POST } from "../../../shared/utils/domain/fixtures/posts.ts";
import { TWO_STEP_PROPOSAL } from "../../../shared/utils/domain/fixtures/proposals.ts";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../shared/utils/domain/fixtures/users.ts";
import { User } from "../../../user/domain/User.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";

describe("Delete proposal by id use case tests", () => {
  const buildOwner = () =>
    User.fromPrimitives({
      ...MANOLO_LOPEZ,
      proposalsCount: 2,
      recentlyViewedContent: [],
    });

  const buildPost = () =>
    Post.fromPrimitives({
      ...ONE_STEP_POST,
      proposalsCount: 3,
    });

  beforeEach(() => {
    const mockProposal = {
      ...TWO_STEP_PROPOSAL,
      userId: new UserId(TWO_STEP_PROPOSAL.userId),
    };
    proposalRepo.getOneById = vi.fn().mockResolvedValue(mockProposal);
    proposalRepo.existsWithId = vi.fn().mockResolvedValue(false);
    userRepo.getOneById = vi.fn().mockResolvedValue(buildOwner());
    userRepo.edit = vi.fn().mockResolvedValue(undefined);
    postRepo.getOneById = vi.fn().mockResolvedValue(buildPost());
    postRepo.edit = vi.fn().mockResolvedValue(undefined);
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

  const deleteProposalById = new DeleteProposalById(
    proposalRepo,
    userRepo,
    postRepo,
  );

  it("Should delete a proposal successfully", async () => {
    await deleteProposalById.run(
      TWO_STEP_PROPOSAL.id,
      TWO_STEP_PROPOSAL.userId,
    );
    expect(proposalRepo.deleteById).toBeCalledTimes(1);
  });

  it("decrements the proposal author's proposal count", async () => {
    await deleteProposalById.run(
      TWO_STEP_PROPOSAL.id,
      TWO_STEP_PROPOSAL.userId,
    );

    expect(userRepo.edit).toBeCalledTimes(1);
    const editedUser = userRepo.edit.mock.calls[0][0] as User;
    expect(editedUser.proposalsCount.value).toBe(1);
  });

  it("decrements the post's proposal count", async () => {
    await deleteProposalById.run(
      TWO_STEP_PROPOSAL.id,
      TWO_STEP_PROPOSAL.userId,
    );

    expect(postRepo.edit).toBeCalledTimes(1);
    const editedPost = postRepo.edit.mock.calls[0][0] as Post;
    expect(editedPost.proposalsCount.value).toBe(2);
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
