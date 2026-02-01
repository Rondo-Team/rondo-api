import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostId } from "../../../../post/domain/value-objects/PostId.ts";
import { GetAllPostFavouritesByUserId } from "../../../../post/post-favourite/application/use-cases/GetAllPostFavouritesByUserId.ts";
import { UnauthorizedUserActionError } from "../../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { ONE_STEP_POST_FAVOURITE } from "../../../../shared/utils/domain/fixtures/postFavourites.ts";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserNotFoundByIdError } from "../../../../user/domain/errors/UserNotFoundByIdError.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Get all post favourites by postID", () => {
  beforeEach(() => {
    const mockUser = {
      ...MANOLO_LOPEZ,
      addFavourite: vi.fn(),
    };
    const mockPostFavourite = {
      ...ONE_STEP_POST_FAVOURITE,
      postId: new PostId(ONE_STEP_POST_FAVOURITE.postId),
      userId: new UserId(ONE_STEP_POST_FAVOURITE.userId),
    };
    userRepo.getOneById = vi.fn().mockResolvedValue(mockUser);
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

  const postFavouriteRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    existsWithId: vi.fn(),
    existsWithUserAndPostId: vi.fn(),
    getAllByPostId: vi.fn(),
    getAllByUserId: vi.fn(),
    deleteById: vi.fn(),
  };

  const getAllFavouritesByUserId = new GetAllPostFavouritesByUserId(
    postFavouriteRepo,
    userRepo
  );

  it("Should get all post favourites succesfully", async () => {
    await getAllFavouritesByUserId.run(
      ONE_STEP_POST_FAVOURITE.userId,
      ONE_STEP_POST_FAVOURITE.userId
    );
    expect(postFavouriteRepo.getAllByUserId).toBeCalledTimes(1);
  });

  it("should not get favourites if user does not exists", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await getAllFavouritesByUserId.run(
          ONE_STEP_POST_FAVOURITE.userId,
          ONE_STEP_POST_FAVOURITE.userId
        )
    ).rejects.toThrow(UserNotFoundByIdError);
  });

  it("should not get favourites if user querying is not the user to check", async () => {
    await expect(
      async () =>
        await getAllFavouritesByUserId.run(
          ONE_STEP_POST_FAVOURITE.userId,
          PEDRO_MARTINEZ.id
        )
    ).rejects.toThrow(UnauthorizedUserActionError);
  });
});
