import { beforeEach, describe, expect, it, vi } from "vitest";
import { ReplyComment } from "../../../comment/application/use-cases/ReplyComment.ts";
import { CommentNotFoundByIdError } from "../../../comment/domain/errors/CommentNotFoundByIdError.ts";
import { CommentReplyRefersToDifferentPostError } from "../../../comment/domain/errors/CommentReplyRefersToDifferentPostError.ts";
import { CommentWithIdAlreadyExistsError } from "../../../comment/domain/errors/CommentWithIdAlreadyExistsError.ts";
import { PostNotFoundByIdError } from "../../../post/domain/errors/PostNotFoundByIdError.ts";
import {
  SAMPLE_CHILD_COMMENT,
  SAMPLE_PARENT_COMMENT,
} from "../../../shared/utils/domain/fixtures/comments.ts";
import {
  ONE_STEP_POST,
  TWO_STEPS_POST,
} from "../../../shared/utils/domain/fixtures/posts.ts";
import { MANOLO_LOPEZ } from "../../../shared/utils/domain/fixtures/users.ts";
import { UserNotFoundByIdError } from "../../../user/domain/errors/UserNotFoundByIdError.ts";

describe("Reply comment use case tests", () => {
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
    detachChildrenFromParent: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
  };

  const replyComment = new ReplyComment(commentRepo, postRepo, userRepo);

  beforeEach(() => {
    vi.clearAllMocks();

    const mockUser = {
      ...MANOLO_LOPEZ,
      addComment: vi.fn(),
    };
    const mockPost = {
      ...ONE_STEP_POST,
      addComment: vi.fn(),
    };
    const mockParentComment = {
      ...SAMPLE_PARENT_COMMENT,
      postId: {
        toPrimitives: vi.fn().mockReturnValue(SAMPLE_PARENT_COMMENT.postId),
      },
    };

    userRepo.getOneById = vi.fn().mockResolvedValue(mockUser);
    postRepo.getOneById = vi.fn().mockResolvedValue(mockPost);
    commentRepo.existsWithId = vi.fn().mockResolvedValue(false);
    commentRepo.getOneById = vi.fn().mockResolvedValue(mockParentComment);
  });

  it("Should create a reply comment successfully", async () => {
    commentRepo.existsWithId = vi
      .fn()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);

    await replyComment.run(
      SAMPLE_CHILD_COMMENT.id,
      SAMPLE_CHILD_COMMENT.userId,
      SAMPLE_CHILD_COMMENT.postId,
      SAMPLE_CHILD_COMMENT.message,
      SAMPLE_CHILD_COMMENT.favouritesCount,
      SAMPLE_CHILD_COMMENT.createdAt,
      SAMPLE_CHILD_COMMENT.parentId
    );

    expect(commentRepo.create).toBeCalledTimes(1);
  });

  it("should not create a reply if user does not exist", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      replyComment.run(
        SAMPLE_CHILD_COMMENT.id,
        SAMPLE_CHILD_COMMENT.userId,
        SAMPLE_CHILD_COMMENT.postId,
        SAMPLE_CHILD_COMMENT.message,
        SAMPLE_CHILD_COMMENT.favouritesCount,
        SAMPLE_CHILD_COMMENT.createdAt,
        SAMPLE_CHILD_COMMENT.parentId
      )
    ).rejects.toThrow(UserNotFoundByIdError);
  });

  it("should not create a reply if post does not exist", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      replyComment.run(
        SAMPLE_CHILD_COMMENT.id,
        SAMPLE_CHILD_COMMENT.userId,
        SAMPLE_CHILD_COMMENT.postId,
        SAMPLE_CHILD_COMMENT.message,
        SAMPLE_CHILD_COMMENT.favouritesCount,
        SAMPLE_CHILD_COMMENT.createdAt,
        SAMPLE_CHILD_COMMENT.parentId
      )
    ).rejects.toThrow(PostNotFoundByIdError);
  });

  it("should not create a reply if id is already used", async () => {
    commentRepo.existsWithId = vi.fn().mockResolvedValue(true);

    await expect(
      replyComment.run(
        SAMPLE_CHILD_COMMENT.id,
        SAMPLE_CHILD_COMMENT.userId,
        SAMPLE_CHILD_COMMENT.postId,
        SAMPLE_CHILD_COMMENT.message,
        SAMPLE_CHILD_COMMENT.favouritesCount,
        SAMPLE_CHILD_COMMENT.createdAt,
        SAMPLE_CHILD_COMMENT.parentId
      )
    ).rejects.toThrow(CommentWithIdAlreadyExistsError);
  });

  it("should not create a reply if parent comment does not exist", async () => {
    await expect(
      replyComment.run(
        SAMPLE_CHILD_COMMENT.id,
        SAMPLE_CHILD_COMMENT.userId,
        SAMPLE_CHILD_COMMENT.postId,
        SAMPLE_CHILD_COMMENT.message,
        SAMPLE_CHILD_COMMENT.favouritesCount,
        SAMPLE_CHILD_COMMENT.createdAt,
        SAMPLE_CHILD_COMMENT.parentId
      )
    ).rejects.toThrow(CommentNotFoundByIdError);
  });

  it("should not create a reply if parent comment refers to different post", async () => {
    const mockParentComment = {
      ...SAMPLE_PARENT_COMMENT,
      postId: {
        toPrimitives: vi.fn().mockReturnValue(TWO_STEPS_POST.id),
      },
    };

    commentRepo.existsWithId = vi
      .fn()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);
    commentRepo.getOneById = vi.fn().mockResolvedValue(mockParentComment);

    await expect(
      replyComment.run(
        SAMPLE_CHILD_COMMENT.id,
        SAMPLE_CHILD_COMMENT.userId,
        SAMPLE_CHILD_COMMENT.postId,
        SAMPLE_CHILD_COMMENT.message,
        SAMPLE_CHILD_COMMENT.favouritesCount,
        SAMPLE_CHILD_COMMENT.createdAt,
        SAMPLE_CHILD_COMMENT.parentId
      )
    ).rejects.toThrow(CommentReplyRefersToDifferentPostError);
  });
});
