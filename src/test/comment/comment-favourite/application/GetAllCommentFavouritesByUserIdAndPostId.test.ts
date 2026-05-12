import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetAllCommentFavouritesByUserIdAndPostId } from "../../../../comment/comment-favourite/application/GetAllCommentFavouritesByUserIdAndPostId.ts";
import { PostNotFoundByIdError } from "../../../../post/domain/errors/PostNotFoundByIdError.ts";
import { SAMPLE_COMMENT_FAVOURITE } from "../../../../shared/utils/domain/fixtures/commentFavourite.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserNotFoundByIdError } from "../../../../user/domain/errors/UserNotFoundByIdError.ts";

describe("Get all comment favourites by userId and postId use case tests", () => {
  beforeEach(() => {
    userRepo.getOneById = vi.fn().mockResolvedValue(MANOLO_LOPEZ);
    postRepo.getOneById = vi.fn().mockResolvedValue(ONE_STEP_POST);
    commentFavouriteRepo.getAllByUserIdAndPostId = vi
      .fn()
      .mockResolvedValue([SAMPLE_COMMENT_FAVOURITE]);
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
    existsWithId: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
  };

  const commentFavouriteRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    getAllByCommentId: vi.fn(),
    getAllByUserIdAndPostId: vi.fn(),
    existsWithId: vi.fn(),
    existsWithUserId: vi.fn(),
    deleteById: vi.fn(),
  };

  const getAllCommentFavouritesByUserIdAndPostId =
    new GetAllCommentFavouritesByUserIdAndPostId(
      commentFavouriteRepo,
      userRepo,
      postRepo,
    );

  it("should get all comment favourites by userId and postId successfully", async () => {
    await getAllCommentFavouritesByUserIdAndPostId.run(
      MANOLO_LOPEZ.id,
      ONE_STEP_POST.id,
    );

    expect(commentFavouriteRepo.getAllByUserIdAndPostId).toBeCalledTimes(1);
  });

  it("should not get comment favourites if user does not exist", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () =>
        await getAllCommentFavouritesByUserIdAndPostId.run(
          MANOLO_LOPEZ.id,
          ONE_STEP_POST.id,
        ),
    ).rejects.toThrow(UserNotFoundByIdError);
  });

  it("should not get comment favourites if post does not exist", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () =>
        await getAllCommentFavouritesByUserIdAndPostId.run(
          MANOLO_LOPEZ.id,
          ONE_STEP_POST.id,
        ),
    ).rejects.toThrow(PostNotFoundByIdError);
  });
});
