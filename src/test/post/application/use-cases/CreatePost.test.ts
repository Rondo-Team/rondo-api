import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreatePost } from "../../../../post/application/use-cases/CreatePost.ts";
import { PostWithIdAlreadyExistsError } from "../../../../post/domain/errors/PostWithIdAlreadyExistsError.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserNotFoundByIdError } from "../../../../user/domain/errors/UserNotFoundByIdError.ts";

describe("Create post use case tests", () => {
  beforeEach(() => {
    const mockUser = {
      ...MANOLO_LOPEZ,
      addPost: vi.fn(),
    };
    userRepo.getOneById = vi.fn().mockResolvedValue(mockUser);
    postRepo.existsWithId = vi.fn().mockResolvedValue(false);
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

  const createPost = new CreatePost(postRepo, userRepo);

  it("Should create a post succesfully", async () => {
    await createPost.run(
      ONE_STEP_POST.id,
      ONE_STEP_POST.userId,
      ONE_STEP_POST.title,
      ONE_STEP_POST.description,
      ONE_STEP_POST.favouritesCount,
      ONE_STEP_POST.commentsCount,
      ONE_STEP_POST.proposalsCount,
      ONE_STEP_POST.createdAt,
      ONE_STEP_POST.tags,
      ONE_STEP_POST.play
    );
    expect(postRepo.create).toBeCalledTimes(1);
  });

  it("should not create a post if user does not exist", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await createPost.run(
          ONE_STEP_POST.id,
          ONE_STEP_POST.userId,
          ONE_STEP_POST.title,
          ONE_STEP_POST.description,
          ONE_STEP_POST.favouritesCount,
          ONE_STEP_POST.commentsCount,
          ONE_STEP_POST.proposalsCount,
          ONE_STEP_POST.createdAt,
          ONE_STEP_POST.tags,
          ONE_STEP_POST.play
        )
    ).rejects.toThrow(UserNotFoundByIdError);
  });

  it("should not create a post if id is already used", async () => {
    postRepo.existsWithId = vi.fn().mockResolvedValue(true);

    await expect(
      async () =>
        await createPost.run(
          ONE_STEP_POST.id,
          ONE_STEP_POST.userId,
          ONE_STEP_POST.title,
          ONE_STEP_POST.description,
          ONE_STEP_POST.favouritesCount,
          ONE_STEP_POST.commentsCount,
          ONE_STEP_POST.proposalsCount,
          ONE_STEP_POST.createdAt,
          ONE_STEP_POST.tags,
          ONE_STEP_POST.play
        )
    ).rejects.toThrow(PostWithIdAlreadyExistsError);
  });
});
