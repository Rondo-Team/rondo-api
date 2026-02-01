import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetAllPostsByUserId } from "../../../../post/application/use-cases/GetAllPostsByUserId.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserNotFoundByIdError } from "../../../../user/domain/errors/UserNotFoundByIdError.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Get draft by user id use case tests", () => {
  beforeEach(() => {
    const mockPost = {
      ...ONE_STEP_POST,
      userId: new UserId(ONE_STEP_POST.userId),
    };
    postRepo.getAllByUserId = vi.fn().mockResolvedValue([mockPost]);
    userRepo.getOneById = vi.fn().mockResolvedValue(true);
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

  const getAllPostsByUserId = new GetAllPostsByUserId(postRepo, userRepo);

  it("Should get all posts succesfully", async () => {
    await getAllPostsByUserId.run(MANOLO_LOPEZ.id);
    expect(postRepo.getAllByUserId).toBeCalledTimes(1);
  });

  it("should not get posts for a non existing user", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () => await getAllPostsByUserId.run(MANOLO_LOPEZ.id)
    ).rejects.toThrow(UserNotFoundByIdError);
  });
});
