import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetDraftById } from "../../../../draft/application/use-cases/GetDraftById.ts";
import { DraftNotFoundByIdError } from "../../../../draft/domain/errors/DraftNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { TWO_STEPS_DRAFT } from "../../../../shared/utils/domain/fixtures/drafts.ts";
import { PEDRO_MARTINEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Get draft by id use case tests", () => {
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

  const getDraftById = new GetDraftById(draftRepo);

  it("Should get a draft succesfully", async () => {
    await getDraftById.run(TWO_STEPS_DRAFT.id, TWO_STEPS_DRAFT.userId);
    expect(draftRepo.getOneById).toBeCalledTimes(1);
  });

  it("should not get a draft if user does not own it", async () => {
    userRepo.existsWithId = vi.fn().mockResolvedValue(true);

    await expect(
      async () => await getDraftById.run(TWO_STEPS_DRAFT.id, PEDRO_MARTINEZ.id)
    ).rejects.toThrow(UnauthorizedUserActionError);
  });

  it("should not get a draft if it does not exist", async () => {
    draftRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () =>
        await getDraftById.run(TWO_STEPS_DRAFT.id, TWO_STEPS_DRAFT.userId)
    ).rejects.toThrow(DraftNotFoundByIdError);
  });
});
