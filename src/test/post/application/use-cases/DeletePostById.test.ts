import { beforeEach, describe, expect, it, vi } from "vitest";
import { DeletePostById } from "../../../../post/application/use-cases/DeletePostById.ts";
import { PostNotFoundByIdError } from "../../../../post/domain/errors/PostNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { TWO_STEPS_DRAFT } from "../../../../shared/utils/domain/fixtures/drafts.ts";
import { TWO_STEPS_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import { PEDRO_MARTINEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Delete post by id use case tests", () => {
  beforeEach(() => {
    const mockPost = {
      ...TWO_STEPS_POST,
      userId: new UserId(TWO_STEPS_POST.userId),
    };
    postRepo.getOneById = vi.fn().mockResolvedValue(mockPost);
    postRepo.existsWithId = vi.fn().mockResolvedValue(false);
  });

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

  const deletePostById = new DeletePostById(postRepo);

  it("Should delete a post succesfully", async () => {
    await deletePostById.run(TWO_STEPS_DRAFT.id, TWO_STEPS_DRAFT.userId);
    expect(postRepo.deleteById).toBeCalledTimes(1);
  });

  it("should not delete a post if user does not own it", async () => {
    await expect(
      async () =>
        await deletePostById.run(TWO_STEPS_DRAFT.id, PEDRO_MARTINEZ.id)
    ).rejects.toThrow(UnauthorizedUserActionError);
  });

  it("should not delete a post if it does not exist", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await deletePostById.run(TWO_STEPS_DRAFT.id, TWO_STEPS_DRAFT.userId)
    ).rejects.toThrow(PostNotFoundByIdError);
  });
});
