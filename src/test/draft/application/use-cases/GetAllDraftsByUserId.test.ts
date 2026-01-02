import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetAllDraftsByUserId } from "../../../../draft/application/use-cases/GetAllDraftsByUserId.ts";
import { TWO_STEPS_DRAFT } from "../../../../shared/utils/domain/fixtures/drafts.ts";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserNotFoundByIdError } from "../../../../user/domain/errors/UserNotFoundByIdError.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Get draft by user id use case tests", () => {
  beforeEach(() => {
    const mockDraft = {
      ...TWO_STEPS_DRAFT,
      userId: new UserId(TWO_STEPS_DRAFT.userId),
    };
    draftRepo.getAllByUserId = vi.fn().mockResolvedValue([mockDraft]);
    userRepo.getOneById = vi.fn().mockResolvedValue(true);
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

  const getAllByUserId = new GetAllDraftsByUserId(draftRepo, userRepo);

  it("Should get all drafts succesfully", async () => {
    await getAllByUserId.run(MANOLO_LOPEZ.id);
    expect(draftRepo.getAllByUserId).toBeCalledTimes(1);
  });

  it("should not get drafts for a non existing user", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () => await getAllByUserId.run(MANOLO_LOPEZ.id)
    ).rejects.toThrow(UserNotFoundByIdError);
  });
});
