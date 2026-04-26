import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostNotFoundByIdError } from "../../../../post/domain/errors/PostNotFoundByIdError.ts";
import { UserHasLikedPost } from "../../../../post/post-favourite/application/use-cases/UserHasLikedPost.ts";
import { UnauthorizedUserActionError } from "../../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserNotFoundByIdError } from "../../../../user/domain/errors/UserNotFoundByIdError.ts";

describe("Checks if a given user has liked a post", () => {
  beforeEach(() => {
    userRepo.getOneById = vi.fn().mockResolvedValue(MANOLO_LOPEZ);
    postRepo.getOneById = vi.fn().mockResolvedValue(ONE_STEP_POST);
    postFavouriteRepo.existsWithUserAndPostId = vi.fn().mockResolvedValue(true);
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

  const userHasLikedPost = new UserHasLikedPost(
    postFavouriteRepo,
    userRepo,
    postRepo,
  );

  it("Should check if a post was liked succesfully", async () => {
    const isLiked = await userHasLikedPost.run(
      ONE_STEP_POST.id,
      MANOLO_LOPEZ.id,
      MANOLO_LOPEZ.id,
    );

    expect(postFavouriteRepo.existsWithUserAndPostId).toBeCalledTimes(1);
    expect(isLiked).toBe(true);
  });

  it("should not check if post was liked if user does not exists", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await userHasLikedPost.run(
          ONE_STEP_POST.id,
          MANOLO_LOPEZ.id,
          MANOLO_LOPEZ.id,
        ),
    ).rejects.toThrow(UserNotFoundByIdError);
  });

  it("should not check if post was liked if post does not exists", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await userHasLikedPost.run(
          ONE_STEP_POST.id,
          MANOLO_LOPEZ.id,
          MANOLO_LOPEZ.id,
        ),
    ).rejects.toThrow(PostNotFoundByIdError);
  });

  it("should not check if post was liked if actor is not user", async () => {
    await expect(
      async () =>
        await userHasLikedPost.run(
          ONE_STEP_POST.id,
          MANOLO_LOPEZ.id,
          PEDRO_MARTINEZ.id,
        ),
    ).rejects.toThrow(UnauthorizedUserActionError);
  });
});
