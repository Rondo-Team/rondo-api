import { beforeEach, describe, expect, it, vi } from "vitest";
import { DeleteDraftById } from "../../../../draft/application/use-cases/DeleteDraftById.ts";
import { DraftNotFoundByIdError } from "../../../../draft/domain/errors/DraftNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { TWO_STEPS_DRAFT } from "../../../../shared/utils/domain/fixtures/drafts.ts";
import { PEDRO_MARTINEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Delete draft by id use case tests", () => {
  beforeEach(() => {
    const mockDraft = {
      ...TWO_STEPS_DRAFT,
      userId: new UserId(TWO_STEPS_DRAFT.userId),
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

  const deleteDraftById = new DeleteDraftById(draftRepo);

  it("Should delete a draft succesfully", async () => {
    await deleteDraftById.run(TWO_STEPS_DRAFT.id, TWO_STEPS_DRAFT.userId);
    expect(draftRepo.deleteById).toBeCalledTimes(1);
  });

  it("should not delete a draft if user does not own it", async () => {
    userRepo.existsWithId = vi.fn().mockResolvedValue(true);

    await expect(
      async () =>
        await deleteDraftById.run(TWO_STEPS_DRAFT.id, PEDRO_MARTINEZ.id)
    ).rejects.toThrow(UnauthorizedUserActionError);
  });

  it("should not delete a draft if it does not exist", async () => {
    draftRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () =>
        await deleteDraftById.run(TWO_STEPS_DRAFT.id, TWO_STEPS_DRAFT.userId)
    ).rejects.toThrow(DraftNotFoundByIdError);
  });
});
