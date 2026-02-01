import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetAllCommentFavouritesByCommentId } from "../../../../comment/comment-favourite/application/GetAllCommentFavouritesByCommentId.ts";
import { CommentNotFoundByIdError } from "../../../../comment/domain/errors/CommentNotFoundByIdError.ts";
import { CommentId } from "../../../../comment/domain/value-objects/CommentId.ts";
import { SAMPLE_COMMENT_FAVOURITE } from "../../../../shared/utils/domain/fixtures/commentFavourite.ts";
import { SAMPLE_PARENT_COMMENT } from "../../../../shared/utils/domain/fixtures/comments.ts";

describe("Get all comment favourites by commentId", () => {
  beforeEach(() => {
    const mockComment = {
      ...SAMPLE_PARENT_COMMENT,
      id: new CommentId(SAMPLE_PARENT_COMMENT.id),
    };
    const mockCommentFavourite = {
      ...SAMPLE_COMMENT_FAVOURITE,
      commentId: new CommentId(SAMPLE_COMMENT_FAVOURITE.commentId),
    };
    commentRepo.getOneById = vi.fn().mockResolvedValue(mockComment);
    commentFavouriteRepo.getOneById = vi
      .fn()
      .mockResolvedValue(mockCommentFavourite);
    commentFavouriteRepo.existsWithId = vi.fn().mockResolvedValue(true);
  });

  const commentRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    getAllByPostId: vi.fn(),
    existsWithId: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
    detachChildrenFromParent: vi.fn(),
  };

  const commentFavouriteRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    existsWithId: vi.fn(),
    existsWithUserId: vi.fn(),
    getAllByCommentId: vi.fn(),
    getAllByUserId: vi.fn(),
    deleteById: vi.fn(),
  };

  const getAllCommentFavouritesByCommentId =
    new GetAllCommentFavouritesByCommentId(commentFavouriteRepo, commentRepo);

  it("Should get all comment favourites successfully", async () => {
    await getAllCommentFavouritesByCommentId.run(
      SAMPLE_COMMENT_FAVOURITE.commentId
    );
    expect(commentFavouriteRepo.getAllByCommentId).toBeCalledTimes(1);
  });

  it("should not get favourites if comment does not exist", async () => {
    commentRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await getAllCommentFavouritesByCommentId.run(
          SAMPLE_COMMENT_FAVOURITE.commentId
        )
    ).rejects.toThrow(CommentNotFoundByIdError);
  });
});
