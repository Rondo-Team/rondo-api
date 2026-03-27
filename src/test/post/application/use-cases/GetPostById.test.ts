import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetPostById } from "../../../../post/application/use-cases/GetPostById.ts";
import { PostNotFoundByIdError } from "../../../../post/domain/errors/PostNotFoundByIdError.ts";
import { RecentlyViewedItemType } from "../../../../shared/domain/types/RecentlyViewedItemType.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import { User } from "../../../../user/domain/User.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Get post by id use case tests", () => {
  beforeEach(() => {
    const mockPost = {
      ...ONE_STEP_POST,
      userId: new UserId(ONE_STEP_POST.userId),
    };
    const mockUser = User.fromPrimitives({
      id: ONE_STEP_POST.userId,
      email: "user@getpostbyid.test",
      username: "postowner",
      name: "Post Owner",
      profilePicture: "https://example.com/picture.png",
      password: "hashed-value-extra-extralarge",
      postsCount: 0,
      proposalsCount: 0,
      favouritePostsCount: 0,
      commentsCount: 0,
      createdAt: new Date("2020-01-01"),
      usernameChangedAt: new Date("2020-01-01"),
      recentlyViewedContent: [],
    });

    postRepo.getOneById = vi.fn().mockResolvedValue(mockPost);
    userRepo.getOneById = vi.fn().mockResolvedValue(mockUser);
    userRepo.existsWithId = vi.fn().mockResolvedValue(true);
    postRepo.existsWithId = vi.fn().mockResolvedValue(false);
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
    getMostRatedPost: vi.fn(),
    getMostRatedPostSinceDays: vi.fn(),
  };

  const getPostById = new GetPostById(postRepo, userRepo);

  it("Should get a post succesfully", async () => {
    await getPostById.run(ONE_STEP_POST.id, ONE_STEP_POST.userId);

    expect(postRepo.getOneById).toBeCalledTimes(1);
    expect(userRepo.edit).toBeCalledTimes(1);

    const editedUser = vi.mocked(userRepo.edit).mock.calls[0][0] as User;
    expect(editedUser.recentlyViewedContent.toPrimitives()).toEqual([
      expect.objectContaining({
        id: ONE_STEP_POST.id,
        type: RecentlyViewedItemType.POST,
        title: ONE_STEP_POST.title,
      }),
    ]);
  });

  it("should not get a post if it does not exist", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () => await getPostById.run(ONE_STEP_POST.id, ONE_STEP_POST.userId),
    ).rejects.toThrow(PostNotFoundByIdError);

    expect(userRepo.edit).not.toBeCalled();
  });
});
