import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChangePostPlay } from "../../../../post/application/use-cases/ChangePostPlay.ts";
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
      changePlay: vi.fn(),
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

  const changePostPlay = new ChangePostPlay(postRepo);

  it("Should change a draft play succesfully", async () => {
    await changePostPlay.run(
      ONE_STEP_POST.id,
      ONE_STEP_POST.userId,
      TWO_STEPS_POST.play
    );
    expect(postRepo.edit).toBeCalledTimes(1);
  });

  it("should not change a draft play if user does not own it", async () => {
    await expect(
      async () =>
        await changePostPlay.run(
          ONE_STEP_POST.id,
          PEDRO_MARTINEZ.id,
          TWO_STEPS_POST.play
        )
    ).rejects.toThrow(UnauthorizedUserActionError);
  });

  it("should not change a post play if it does not exist", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await changePostPlay.run(
          ONE_STEP_POST.id,
          TWO_STEPS_POST.userId,
          TWO_STEPS_POST.play
        )
    ).rejects.toThrow(PostNotFoundByIdError);
  });
});
