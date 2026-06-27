import { beforeEach, describe, expect, it, vi } from "vitest";
import { DeletePostById } from "../../../../post/application/use-cases/DeletePostById.ts";
import { PostNotFoundByIdError } from "../../../../post/domain/errors/PostNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { RecentlyViewedItemType } from "../../../../shared/domain/types/RecentlyViewedItemType.ts";
import { TWO_STEPS_DRAFT } from "../../../../shared/utils/domain/fixtures/drafts.ts";
import { TWO_STEPS_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import { PEDRO_MARTINEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { User } from "../../../../user/domain/User.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Delete post by id use case tests", () => {
  const buildOwner = () =>
    User.fromPrimitives({
      id: TWO_STEPS_POST.userId,
      email: "owner@deletepostbyid.test",
      username: "postowner",
      name: "Post Owner",
      profilePicture: "https://example.com/picture.png",
      password: "hashed-value-extra-extralarge",
      postsCount: 1,
      proposalsCount: 0,
      favouritePostsCount: 0,
      commentsCount: 0,
      createdAt: new Date("2020-01-01"),
      usernameChangedAt: new Date("2020-01-01"),
      recentlyViewedContent: [
        {
          id: TWO_STEPS_DRAFT.id,
          type: RecentlyViewedItemType.POST,
          openedAt: new Date("2020-01-01"),
        },
      ],
    });

  beforeEach(() => {
    const mockPost = {
      ...TWO_STEPS_POST,
      userId: new UserId(TWO_STEPS_POST.userId),
    };
    postRepo.getOneById = vi.fn().mockResolvedValue(mockPost);
    postRepo.existsWithId = vi.fn().mockResolvedValue(false);
    userRepo.getOneById = vi.fn().mockResolvedValue(buildOwner());
    userRepo.existsWithId = vi.fn().mockResolvedValue(true);
    userRepo.edit = vi.fn().mockResolvedValue(undefined);
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

  const deletePostById = new DeletePostById(postRepo, userRepo);

  it("Should delete a post succesfully", async () => {
    await deletePostById.run(TWO_STEPS_DRAFT.id, TWO_STEPS_DRAFT.userId);
    expect(postRepo.deleteById).toBeCalledTimes(1);
  });

  it("removes the deleted post from the user's recently viewed content", async () => {
    await deletePostById.run(TWO_STEPS_DRAFT.id, TWO_STEPS_DRAFT.userId);

    expect(userRepo.edit).toBeCalledTimes(1);
    const editedUser = userRepo.edit.mock.calls[0][0] as User;
    expect(editedUser.recentlyViewedContent.toPrimitives()).toEqual([]);
  });

  it("should not delete a post if user does not own it", async () => {
    await expect(
      async () =>
        await deletePostById.run(TWO_STEPS_DRAFT.id, PEDRO_MARTINEZ.id),
    ).rejects.toThrow(UnauthorizedUserActionError);
  });

  it("should not delete a post if it does not exist", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await deletePostById.run(TWO_STEPS_DRAFT.id, TWO_STEPS_DRAFT.userId),
    ).rejects.toThrow(PostNotFoundByIdError);
  });
});
