import { beforeEach, describe, expect, it, vi } from "vitest";
import { DeleteCommentById } from "../../../comment/application/use-cases/DeleteCommentById.ts";
import { CommentNotFoundByIdError } from "../../../comment/domain/errors/CommentNotFoundByIdError.ts";
import { PostNotFoundByIdError } from "../../../post/domain/errors/PostNotFoundByIdError.ts";
import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { UnauthorizedUserActionError } from "../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { SAMPLE_PARENT_COMMENT } from "../../../shared/utils/domain/fixtures/comments.ts";
import { ONE_STEP_POST } from "../../../shared/utils/domain/fixtures/posts.ts";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../shared/utils/domain/fixtures/users.ts";
import { UserNotFoundByIdError } from "../../../user/domain/errors/UserNotFoundByIdError.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";

describe("Delete comment by id use case tests", () => {
  const mockUser = {
    ...MANOLO_LOPEZ,
    userId: UserId.fromPrimitives(MANOLO_LOPEZ.id),
    deleteComment: vi.fn(),
  };

  const mockPost = {
    ...ONE_STEP_POST,
    userId: UserId.fromPrimitives(ONE_STEP_POST.userId),
    deleteComment: vi.fn(),
  };

  const mockComment = {
    ...SAMPLE_PARENT_COMMENT,
    userId: UserId.fromPrimitives(SAMPLE_PARENT_COMMENT.userId),
    postId: PostId.fromPrimitives(SAMPLE_PARENT_COMMENT.postId),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    userRepo.getOneById = vi.fn().mockResolvedValue(mockUser);
    postRepo.getOneById = vi.fn().mockResolvedValue(mockPost);
    commentRepo.getOneById = vi.fn().mockResolvedValue(mockComment);
    commentRepo.existsWithId = vi.fn().mockResolvedValue(true);
  });

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

  const commentRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    existsWithId: vi.fn(),
    getAllByPostId: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
    detachChildrenFromParent: vi.fn(),
  };

  const deleteCommentById = new DeleteCommentById(
    commentRepo,
    userRepo,
    postRepo
  );

  it("Should delete a comment successfully", async () => {
    await deleteCommentById.run(
      SAMPLE_PARENT_COMMENT.id,
      SAMPLE_PARENT_COMMENT.userId
    );

    expect(commentRepo.deleteById).toBeCalledTimes(1);
    expect(mockUser.deleteComment).toBeCalledTimes(1);
    expect(mockPost.deleteComment).toBeCalledTimes(1);
    expect(userRepo.edit).toBeCalledTimes(1);
    expect(postRepo.edit).toBeCalledTimes(1);
    expect(commentRepo.detachChildrenFromParent).toBeCalledTimes(1);
  });

  it("should not delete a comment if comment does not exist", async () => {
    commentRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await deleteCommentById.run(
          SAMPLE_PARENT_COMMENT.id,
          SAMPLE_PARENT_COMMENT.userId
        )
    ).rejects.toThrow(CommentNotFoundByIdError);
  });

  it("should not delete a comment if user does not have permission", async () => {
    await expect(
      async () =>
        await deleteCommentById.run(SAMPLE_PARENT_COMMENT.id, PEDRO_MARTINEZ.id)
    ).rejects.toThrow(UnauthorizedUserActionError);
  });

  it("should not delete a comment if user does not exist", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await deleteCommentById.run(
          SAMPLE_PARENT_COMMENT.id,
          SAMPLE_PARENT_COMMENT.userId
        )
    ).rejects.toThrow(UserNotFoundByIdError);
  });

  it("should not delete a comment if post does not exist", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await deleteCommentById.run(
          SAMPLE_PARENT_COMMENT.id,
          SAMPLE_PARENT_COMMENT.userId
        )
    ).rejects.toThrow(PostNotFoundByIdError);
  });
});
