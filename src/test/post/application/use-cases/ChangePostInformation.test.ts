import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChangePostInformation } from "../../../../post/application/use-cases/ChangePostInformation.ts";
import { PostNotFoundByIdError } from "../../../../post/domain/errors/PostNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import {
  ONE_STEP_POST,
  TWO_STEPS_POST,
} from "../../../../shared/utils/domain/fixtures/posts.ts";
import { PEDRO_MARTINEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Create post use case tests", () => {
  beforeEach(() => {
    const mockDraft = {
      ...ONE_STEP_POST,
      userId: new UserId(ONE_STEP_POST.userId),
      changeTitle: vi.fn(),
      changeDescription: vi.fn(),
    };
    postRepo.getOneById = vi.fn().mockResolvedValue(mockDraft);
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

  const changePostInformation = new ChangePostInformation(postRepo);

  it("Should change a post information succesfully", async () => {
    await changePostInformation.run(
      ONE_STEP_POST.id,
      ONE_STEP_POST.userId,
      TWO_STEPS_POST.title,
      TWO_STEPS_POST.description
    );
    expect(postRepo.edit).toBeCalledTimes(1);
  });

  it("should not change a post information if user does not own it", async () => {
    await expect(
      async () =>
        await changePostInformation.run(
          ONE_STEP_POST.id,
          PEDRO_MARTINEZ.id,
          TWO_STEPS_POST.title,
          TWO_STEPS_POST.description
        )
    ).rejects.toThrow(UnauthorizedUserActionError);
  });

  it("should not change a post information if it does not exist", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await changePostInformation.run(
          ONE_STEP_POST.id,
          TWO_STEPS_POST.userId,
          TWO_STEPS_POST.title,
          TWO_STEPS_POST.description
        )
    ).rejects.toThrow(PostNotFoundByIdError);
  });
});
