import { beforeEach, describe, expect, it, vi } from "vitest";
import { UnmarkCommentAsFavourite } from "../../../../comment/comment-favourite/application/UnmarkCommentAsFavourite.ts";
import { CommentFavouriteNotFoundByIdError } from "../../../../comment/comment-favourite/domain/errors/CommentFavouriteNotFoundByIdError.ts";
import { CommentNotFoundByIdError } from "../../../../comment/domain/errors/CommentNotFoundByIdError.ts";
import { CommentId } from "../../../../comment/domain/value-objects/CommentId.ts";
import { UnauthorizedUserActionError } from "../../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { SAMPLE_COMMENT_FAVOURITE } from "../../../../shared/utils/domain/fixtures/commentFavourite.ts";
import { SAMPLE_PARENT_COMMENT } from "../../../../shared/utils/domain/fixtures/comments.ts";
import { PEDRO_MARTINEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Unmark comment as favourite use case tests", () => {
  beforeEach(() => {
    const mockComment = {
      ...SAMPLE_PARENT_COMMENT,
      id: new CommentId(SAMPLE_PARENT_COMMENT.id),
      deleteFavourite: vi.fn(),
    };
    const mockCommentFavourite = {
      ...SAMPLE_COMMENT_FAVOURITE,
      commentId: new CommentId(SAMPLE_COMMENT_FAVOURITE.commentId),
      userId: new UserId(SAMPLE_COMMENT_FAVOURITE.userId),
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

  const unmarkCommentAsFavourite = new UnmarkCommentAsFavourite(
    commentFavouriteRepo,
    commentRepo
  );

  it("Should unmark a comment as favourite successfully", async () => {
    await unmarkCommentAsFavourite.run(
      SAMPLE_COMMENT_FAVOURITE.id,
      SAMPLE_COMMENT_FAVOURITE.userId
    );
    expect(commentFavouriteRepo.deleteById).toBeCalledTimes(1);
  });

  it("should not unmark a comment as favourite if id does not exist", async () => {
    commentFavouriteRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await unmarkCommentAsFavourite.run(
          SAMPLE_COMMENT_FAVOURITE.id,
          SAMPLE_COMMENT_FAVOURITE.userId
        )
    ).rejects.toThrow(CommentFavouriteNotFoundByIdError);
  });

  it("should not unmark a comment as favourite if comment does not exist", async () => {
    commentRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await unmarkCommentAsFavourite.run(
          SAMPLE_COMMENT_FAVOURITE.id,
          SAMPLE_COMMENT_FAVOURITE.userId
        )
    ).rejects.toThrow(CommentNotFoundByIdError);
  });

  it("should not unmark a comment as favourite if user has no permission", async () => {
    await expect(
      async () =>
        await unmarkCommentAsFavourite.run(
          SAMPLE_COMMENT_FAVOURITE.id,
          PEDRO_MARTINEZ.id
        )
    ).rejects.toThrowError(UnauthorizedUserActionError);
  });
});
