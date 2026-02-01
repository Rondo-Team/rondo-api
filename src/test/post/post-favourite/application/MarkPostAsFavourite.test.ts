import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostNotFoundByIdError } from "../../../../post/domain/errors/PostNotFoundByIdError.ts";
import { MarkPostAsFavourite } from "../../../../post/post-favourite/application/use-cases/MarkPostAsFavourite.ts";
import { PostFavouriteWithIdAlreadyExistsError } from "../../../../post/post-favourite/domain/errors/PostFavouriteWithIdAlreadyExistsError.ts";
import { UserAlreadyLikedPostError } from "../../../../post/post-favourite/domain/errors/UserAlreadyLikedPostError.ts";
import { ONE_STEP_POST_FAVOURITE } from "../../../../shared/utils/domain/fixtures/postFavourites.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserNotFoundByIdError } from "../../../../user/domain/errors/UserNotFoundByIdError.ts";

describe("Mark post as favourite use case tests", () => {
  beforeEach(() => {
    const mockUser = {
      ...MANOLO_LOPEZ,
      addFavourite: vi.fn(),
    };
    const mockPost = {
      ...ONE_STEP_POST,
      addFavourite: vi.fn(),
    };
    userRepo.getOneById = vi.fn().mockResolvedValue(mockUser);
    postRepo.getOneById = vi.fn().mockResolvedValue(mockPost);
    postFavouriteRepo.existsWithId = vi.fn().mockResolvedValue(false);
    postFavouriteRepo.existsWithUserAndPostId = vi
      .fn()
      .mockResolvedValue(false);
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

  const markPostAsFavourite = new MarkPostAsFavourite(
    postFavouriteRepo,
    userRepo,
    postRepo
  );

  it("Should mark a post as favourite succesfully", async () => {
    await markPostAsFavourite.run(
      ONE_STEP_POST_FAVOURITE.id,
      ONE_STEP_POST_FAVOURITE.userId,
      ONE_STEP_POST_FAVOURITE.createdAt,
      ONE_STEP_POST_FAVOURITE.postId
    );
    expect(postFavouriteRepo.create).toBeCalledTimes(1);
  });

  it("should not mark a post as favourite if user does not exist", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await markPostAsFavourite.run(
          ONE_STEP_POST_FAVOURITE.id,
          ONE_STEP_POST_FAVOURITE.userId,
          ONE_STEP_POST_FAVOURITE.createdAt,
          ONE_STEP_POST_FAVOURITE.postId
        )
    ).rejects.toThrow(UserNotFoundByIdError);
  });

  it("should not mark a post as favourite if id is already used", async () => {
    postFavouriteRepo.existsWithId = vi.fn().mockResolvedValue(true);

    await expect(
      async () =>
        await markPostAsFavourite.run(
          ONE_STEP_POST_FAVOURITE.id,
          ONE_STEP_POST_FAVOURITE.userId,
          ONE_STEP_POST_FAVOURITE.createdAt,
          ONE_STEP_POST_FAVOURITE.postId
        )
    ).rejects.toThrow(PostFavouriteWithIdAlreadyExistsError);
  });

  it("should not mark a post as favourite if post does not exist", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await markPostAsFavourite.run(
          ONE_STEP_POST_FAVOURITE.id,
          ONE_STEP_POST_FAVOURITE.userId,
          ONE_STEP_POST_FAVOURITE.createdAt,
          ONE_STEP_POST_FAVOURITE.postId
        )
    ).rejects.toThrow(PostNotFoundByIdError);
  });

  it("should not mark a post as favourite if user already marked it", async () => {
    postFavouriteRepo.existsWithUserAndPostId = vi.fn().mockResolvedValue(true);

    await expect(
      async () =>
        await markPostAsFavourite.run(
          ONE_STEP_POST_FAVOURITE.id,
          ONE_STEP_POST_FAVOURITE.userId,
          ONE_STEP_POST_FAVOURITE.createdAt,
          ONE_STEP_POST_FAVOURITE.postId
        )
    ).rejects.toThrow(UserAlreadyLikedPostError);
  });
});
