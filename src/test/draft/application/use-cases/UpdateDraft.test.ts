import { beforeEach, describe, expect, it, vi } from "vitest";
import { UpdateDraft } from "../../../../draft/application/use-cases/UpdateDraft.ts";
import { DraftNotFoundByIdError } from "../../../../draft/domain/errors/DraftNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import {
  ONE_STEP_DRAFT,
  TWO_STEPS_DRAFT,
} from "../../../../shared/utils/domain/fixtures/drafts.ts";
import { PEDRO_MARTINEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Update draft use case tests", () => {
  let mockDraft;

  const draftRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    getAllByUserId: vi.fn(),
    existsWithId: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
  };

  const updateDraft = new UpdateDraft(draftRepo);

  beforeEach(() => {
    vi.clearAllMocks();

    mockDraft = {
      ...ONE_STEP_DRAFT,
      userId: new UserId(ONE_STEP_DRAFT.userId),
      changePlay: vi.fn(),
      changeTitle: vi.fn(),
      changeDescription: vi.fn(),
    };

    draftRepo.getOneById = vi.fn().mockResolvedValue(mockDraft);
  });

  it("should update all provided fields successfully", async () => {
    await updateDraft.run(
      ONE_STEP_DRAFT.id,
      ONE_STEP_DRAFT.userId,
      TWO_STEPS_DRAFT.play,
      TWO_STEPS_DRAFT.title,
      TWO_STEPS_DRAFT.description,
    );

    expect(mockDraft.changePlay).toBeCalledTimes(1);
    expect(mockDraft.changeTitle).toBeCalledTimes(1);
    expect(mockDraft.changeDescription).toBeCalledTimes(1);
    expect(draftRepo.edit).toBeCalledTimes(1);
  });

  it("should update only provided fields", async () => {
    await updateDraft.run(
      ONE_STEP_DRAFT.id,
      ONE_STEP_DRAFT.userId,
      undefined,
      TWO_STEPS_DRAFT.title,
      undefined,
    );

    expect(mockDraft.changePlay).not.toBeCalled();
    expect(mockDraft.changeTitle).toBeCalledTimes(1);
    expect(mockDraft.changeDescription).not.toBeCalled();
    expect(draftRepo.edit).toBeCalledTimes(1);
  });

  it("should not update a draft if user does not own it", async () => {
    await expect(
      async () =>
        await updateDraft.run(
          ONE_STEP_DRAFT.id,
          PEDRO_MARTINEZ.id,
          TWO_STEPS_DRAFT.play,
          TWO_STEPS_DRAFT.title,
          TWO_STEPS_DRAFT.description,
        ),
    ).rejects.toThrow(UnauthorizedUserActionError);
  });

  it("should not update a draft if it does not exist", async () => {
    draftRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () =>
        await updateDraft.run(
          ONE_STEP_DRAFT.id,
          TWO_STEPS_DRAFT.userId,
          TWO_STEPS_DRAFT.play,
          TWO_STEPS_DRAFT.title,
          TWO_STEPS_DRAFT.description,
        ),
    ).rejects.toThrow(DraftNotFoundByIdError);
  });
});
