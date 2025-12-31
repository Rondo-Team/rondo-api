import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChangeDraftPlay } from "../../../../draft/application/use-cases/ChangeDraftPlay.ts";
import { DraftNotFoundByIdError } from "../../../../draft/domain/errors/DraftNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import {
  ONE_STEP_DRAFT,
  TWO_STEPS_DRAFT,
} from "../../../../shared/utils/domain/fixtures/drafts.ts";
import { PEDRO_MARTINEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Get draft by id use case tests", () => {
  beforeEach(() => {
    const mockDraft = {
      ...TWO_STEPS_DRAFT,
      userId: new UserId(TWO_STEPS_DRAFT.userId),
      changePlay: vi.fn(),
    };
    draftRepo.getOneById = vi.fn().mockResolvedValue(mockDraft);
    userRepo.existsWithId = vi.fn().mockResolvedValue(true);
    draftRepo.existsWithId = vi.fn().mockResolvedValue(false);
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

  const draftRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    getAllByUserId: vi.fn(),
    existsWithId: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
  };

  const changeDraftPlay = new ChangeDraftPlay(draftRepo);

  it("Should cahnge a draft play succesfully", async () => {
    await changeDraftPlay.run(
      TWO_STEPS_DRAFT.id,
      TWO_STEPS_DRAFT.userId,
      ONE_STEP_DRAFT.play
    );
    expect(draftRepo.edit).toBeCalledTimes(1);
  });

  it("should not change a draft play if user does not own it", async () => {
    userRepo.existsWithId = vi.fn().mockResolvedValue(true);

    await expect(
      async () =>
        await changeDraftPlay.run(
          TWO_STEPS_DRAFT.id,
          PEDRO_MARTINEZ.id,
          ONE_STEP_DRAFT.play
        )
    ).rejects.toThrow(UnauthorizedUserActionError);
  });

  it("should not change a draft play if it does not exist", async () => {
    draftRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () =>
        await changeDraftPlay.run(
          TWO_STEPS_DRAFT.id,
          TWO_STEPS_DRAFT.userId,
          ONE_STEP_DRAFT.play
        )
    ).rejects.toThrow(DraftNotFoundByIdError);
  });
});
