import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostNotFoundByIdError } from "../../../../post/domain/errors/PostNotFoundByIdError.ts";
import { PostId } from "../../../../post/domain/value-objects/PostId.ts";
import { GetLikeByUserAndPost } from "../../../../post/post-favourite/application/use-cases/GetLikeByUserAndPost.ts";
import { LikeWithUserAndPostNotFoundError } from "../../../../post/post-favourite/domain/errors/LikeWithUserAndPostNotFoundError.ts";
import { ONE_STEP_POST_FAVOURITE } from "../../../../shared/utils/domain/fixtures/postFavourites.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserNotFoundByIdError } from "../../../../user/domain/errors/UserNotFoundByIdError.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Get like by user and post use case tests", () => {
  const mockFavourite = {
    ...ONE_STEP_POST_FAVOURITE,
    postId: new PostId(ONE_STEP_POST_FAVOURITE.postId),
    userId: new UserId(ONE_STEP_POST_FAVOURITE.userId),
    toPrimitives: vi.fn().mockReturnValue(ONE_STEP_POST_FAVOURITE),
  };

  beforeEach(() => {
    userRepo.getOneById = vi.fn().mockResolvedValue(MANOLO_LOPEZ);
    postRepo.getOneById = vi.fn().mockResolvedValue(ONE_STEP_POST);
    postFavouriteRepo.getByUserAndPostId = vi
      .fn()
      .mockResolvedValue(mockFavourite);
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
    getByUserAndPostId: vi.fn(),
    existsWithId: vi.fn(),
    existsWithUserAndPostId: vi.fn(),
    getAllByPostId: vi.fn(),
    getAllByUserId: vi.fn(),
    deleteById: vi.fn(),
  };

  const getLikeByUserAndPost = new GetLikeByUserAndPost(
    postFavouriteRepo,
    userRepo,
    postRepo,
  );

  it("Should get the like for a user and a post succesfully", async () => {
    const favourite = await getLikeByUserAndPost.run(
      ONE_STEP_POST.id,
      MANOLO_LOPEZ.id,
    );

    expect(postFavouriteRepo.getByUserAndPostId).toBeCalledTimes(1);
    expect(favourite).toBe(mockFavourite);
  });

  it("should not get the like if user does not exists", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await getLikeByUserAndPost.run(ONE_STEP_POST.id, MANOLO_LOPEZ.id),
    ).rejects.toThrow(UserNotFoundByIdError);
  });

  it("should not get the like if post does not exists", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await getLikeByUserAndPost.run(ONE_STEP_POST.id, MANOLO_LOPEZ.id),
    ).rejects.toThrow(PostNotFoundByIdError);
  });

  it("should not get the like if user has not liked the post", async () => {
    postFavouriteRepo.getByUserAndPostId = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () =>
        await getLikeByUserAndPost.run(ONE_STEP_POST.id, MANOLO_LOPEZ.id),
    ).rejects.toThrow(LikeWithUserAndPostNotFoundError);
  });
});
