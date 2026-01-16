import { beforeEach, describe, expect, it, vi } from "vitest";
import { MarkCommentAsFavourite } from "../../../../comment/comment-favourite/application/MarkCommentAsFavourite.ts";
import { CommentNotFoundByIdError } from "../../../../comment/domain/errors/CommentNotFoundByIdError.ts";
import { SAMPLE_COMMENT_FAVOURITE } from "../../../../shared/utils/domain/fixtures/commentFavourite.ts";
import { SAMPLE_PARENT_COMMENT } from "../../../../shared/utils/domain/fixtures/comments.ts";

describe("Mark comment as favourite use case tests", () => {
  beforeEach(() => {
    const mockComment = {
      ...SAMPLE_PARENT_COMMENT,
      addFavourite: vi.fn(),
    };
    commentRepo.getOneById = vi.fn().mockResolvedValue(mockComment);
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

  const markCommentAsFavourite = new MarkCommentAsFavourite(
    commentFavouriteRepo,
    commentRepo
  );

  it("Should mark a comment as favourite successfully", async () => {
    await markCommentAsFavourite.run(
      SAMPLE_COMMENT_FAVOURITE.id,
      SAMPLE_COMMENT_FAVOURITE.userId,
      SAMPLE_COMMENT_FAVOURITE.createdAt,
      SAMPLE_COMMENT_FAVOURITE.commentId
    );
    expect(commentFavouriteRepo.create).toBeCalledTimes(1);
  });

  it("should not mark a comment as favourite if comment does not exist", async () => {
    commentRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await markCommentAsFavourite.run(
          SAMPLE_COMMENT_FAVOURITE.id,
          SAMPLE_COMMENT_FAVOURITE.userId,
          SAMPLE_COMMENT_FAVOURITE.createdAt,
          SAMPLE_COMMENT_FAVOURITE.commentId
        )
    ).rejects.toThrow(CommentNotFoundByIdError);
  });
});
