import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostNotFoundByIdError } from "../../../../post/domain/errors/PostNotFoundByIdError.ts";
import { PostId } from "../../../../post/domain/value-objects/PostId.ts";
import { UnmarkPostAsFavourite } from "../../../../post/post-favourite/application/use-cases/UnmarkPostAsFavourite.ts";
import { PostFavouriteNotFoundByIdError } from "../../../../post/post-favourite/domain/errors/PostFavouriteNotFoundByIdError.ts";
import { ONE_STEP_POST_FAVOURITE } from "../../../../shared/utils/domain/fixtures/postFavourites.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserNotFoundByIdError } from "../../../../user/domain/errors/UserNotFoundByIdError.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Unmark post as favourite use case tests", () => {
  beforeEach(() => {
    const mockUser = {
      ...MANOLO_LOPEZ,
      id: new UserId(MANOLO_LOPEZ.id),
      deleteFavourite: vi.fn(),
    };
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
    userRepo.getOneById = vi.fn().mockResolvedValue(mockUser);
    postRepo.getOneById = vi.fn().mockResolvedValue(mockPost);
    postFavouriteRepo.getOneById = vi.fn().mockResolvedValue(mockPostFavourite);
    postFavouriteRepo.existsWithId = vi.fn().mockResolvedValue(true);
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

  const postFavouriteRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    existsWithId: vi.fn(),
    existsWithUserAndPostId: vi.fn(),
    getAllByPostId: vi.fn(),
    getAllByUserId: vi.fn(),
    deleteById: vi.fn(),
  };

  const unmarkPostAsFavourite = new UnmarkPostAsFavourite(
    postFavouriteRepo,
    userRepo,
    postRepo
  );

  it("Should unmark a post as favourite succesfully", async () => {
    await unmarkPostAsFavourite.run(
      ONE_STEP_POST_FAVOURITE.id,
      ONE_STEP_POST_FAVOURITE.userId
    );
    expect(postFavouriteRepo.deleteById).toBeCalledTimes(1);
  });

  it("should not unmark a post as favourite if user does not exist", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await unmarkPostAsFavourite.run(
          ONE_STEP_POST_FAVOURITE.id,
          ONE_STEP_POST_FAVOURITE.userId
        )
    ).rejects.toThrow(UserNotFoundByIdError);
  });

  it("should not unmark a post as favourite if id does not exists", async () => {
    postFavouriteRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await unmarkPostAsFavourite.run(
          ONE_STEP_POST_FAVOURITE.id,
          ONE_STEP_POST_FAVOURITE.userId
        )
    ).rejects.toThrow(PostFavouriteNotFoundByIdError);
  });

  it("should not unmark a post as favourite if post does not exist", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () =>
        await unmarkPostAsFavourite.run(
          ONE_STEP_POST_FAVOURITE.id,
          ONE_STEP_POST_FAVOURITE.userId
        )
    ).rejects.toThrow(PostNotFoundByIdError);
  });
});
