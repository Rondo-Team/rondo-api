import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetPostById } from "../../../../post/application/use-cases/GetPostById.ts";
import { PostNotFoundByIdError } from "../../../../post/domain/errors/PostNotFoundByIdError.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Get post by id use case tests", () => {
  beforeEach(() => {
    const mockPost = {
      ...ONE_STEP_POST,
      userId: new UserId(ONE_STEP_POST.userId),
    };
    postRepo.getOneById = vi.fn().mockResolvedValue(mockPost);
    userRepo.existsWithId = vi.fn().mockResolvedValue(true);
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

  const getPostById = new GetPostById(postRepo);

  it("Should get a post succesfully", async () => {
    await getPostById.run(ONE_STEP_POST.id);
    expect(postRepo.getOneById).toBeCalledTimes(1);
  });

  it("should not get a post if it does not exist", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () => await getPostById.run(ONE_STEP_POST.id)
    ).rejects.toThrow(PostNotFoundByIdError);
  });
});
