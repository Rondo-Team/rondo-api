import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateComment } from "../../../comment/application/use-cases/CreateComment.ts";
import { CommentWithIdAlreadyExistsError } from "../../../comment/domain/errors/CommentWithIdAlreadyExistsError.ts";
import { PostNotFoundByIdError } from "../../../post/domain/errors/PostNotFoundByIdError.ts";
import { SAMPLE_PARENT_COMMENT } from "../../../shared/utils/domain/fixtures/comments.ts";
import { ONE_STEP_POST } from "../../../shared/utils/domain/fixtures/posts.ts";
import { MANOLO_LOPEZ } from "../../../shared/utils/domain/fixtures/users.ts";
import { UserNotFoundByIdError } from "../../../user/domain/errors/UserNotFoundByIdError.ts";

describe("Create comment use case tests", () => {
  beforeEach(() => {
    const mockUser = {
      ...MANOLO_LOPEZ,
      addComment: vi.fn(),
    };
    const mockPost = {
      ...ONE_STEP_POST,
      addComment: vi.fn(),
    };
    userRepo.getOneById = vi.fn().mockResolvedValue(mockUser);
    postRepo.getOneById = vi.fn().mockResolvedValue(mockPost);
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
  };

  const createComment = new CreateComment(commentRepo, postRepo, userRepo);

  it("Should create a comment succesfully", async () => {
    await createComment.run(
      SAMPLE_PARENT_COMMENT.id,
      SAMPLE_PARENT_COMMENT.userId,
      SAMPLE_PARENT_COMMENT.postId,
      SAMPLE_PARENT_COMMENT.message,
      SAMPLE_PARENT_COMMENT.favouritesCount,
      SAMPLE_PARENT_COMMENT.createdAt
    );
    expect(commentRepo.create).toBeCalledTimes(1);
  });

  it("should not create a comment if user does not exist", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await createComment.run(
          SAMPLE_PARENT_COMMENT.id,
          SAMPLE_PARENT_COMMENT.userId,
          SAMPLE_PARENT_COMMENT.postId,
          SAMPLE_PARENT_COMMENT.message,
          SAMPLE_PARENT_COMMENT.favouritesCount,
          SAMPLE_PARENT_COMMENT.createdAt
        )
    ).rejects.toThrow(UserNotFoundByIdError);
  });

  it("should not create a comment if id is already used", async () => {
    commentRepo.existsWithId = vi.fn().mockResolvedValue(true);

    await expect(
      async () =>
        await createComment.run(
          SAMPLE_PARENT_COMMENT.id,
          SAMPLE_PARENT_COMMENT.userId,
          SAMPLE_PARENT_COMMENT.postId,
          SAMPLE_PARENT_COMMENT.message,
          SAMPLE_PARENT_COMMENT.favouritesCount,
          SAMPLE_PARENT_COMMENT.createdAt
        )
    ).rejects.toThrow(CommentWithIdAlreadyExistsError);
  });

  it("should not create a comment if post does not exist", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await createComment.run(
          SAMPLE_PARENT_COMMENT.id,
          SAMPLE_PARENT_COMMENT.userId,
          SAMPLE_PARENT_COMMENT.postId,
          SAMPLE_PARENT_COMMENT.message,
          SAMPLE_PARENT_COMMENT.favouritesCount,
          SAMPLE_PARENT_COMMENT.createdAt
        )
    ).rejects.toThrow(PostNotFoundByIdError);
  });
});
