import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostNotFoundByIdError } from "../../../../post/domain/errors/PostNotFoundByIdError.ts";
import { PostId } from "../../../../post/domain/value-objects/PostId.ts";
import { GetAllPostFavouritesByPostId } from "../../../../post/post-favourite/application/use-cases/GetAllPostFavouritesByPostId.ts";
import { ONE_STEP_POST_FAVOURITE } from "../../../../shared/utils/domain/fixtures/postFavourites.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Get all post favourites by postID", () => {
  beforeEach(() => {
    const mockPost = {
      ...ONE_STEP_POST,
      id: new PostId(ONE_STEP_POST.id),
      userId: new UserId(MANOLO_LOPEZ.id),
      deleteFavourite: vi.fn(),
    };
    const mockPostFavourite = {
      ...ONE_STEP_POST_FAVOURITE,
      postId: new PostId(ONE_STEP_POST_FAVOURITE.postId),
      userId: new UserId(ONE_STEP_POST_FAVOURITE.userId),
    };
    postRepo.getOneById = vi.fn().mockResolvedValue(mockPost);
    postFavouriteRepo.getOneById = vi.fn().mockResolvedValue(mockPostFavourite);
    postFavouriteRepo.existsWithId = vi.fn().mockResolvedValue(true);
  });

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

  const postFavouriteRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    existsWithId: vi.fn(),
    existsWithUserAndPostId: vi.fn(),
    getAllByPostId: vi.fn(),
    getAllByUserId: vi.fn(),
    deleteById: vi.fn(),
  };

  const getAllFavouritesByPostId = new GetAllPostFavouritesByPostId(
    postFavouriteRepo,
    postRepo
  );

  it("Should get all post favourites succesfully", async () => {
    await getAllFavouritesByPostId.run(ONE_STEP_POST_FAVOURITE.postId);
    expect(postFavouriteRepo.getAllByPostId).toBeCalledTimes(1);
  });

  it("should not get favourites if post does not exists", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await getAllFavouritesByPostId.run(ONE_STEP_POST_FAVOURITE.postId)
    ).rejects.toThrow(PostNotFoundByIdError);
  });
});
