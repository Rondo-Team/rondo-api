import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateDraft } from "../../../../draft/application/use-cases/CreateDraft.ts";
import { DraftWithIdAlreadyExistsError } from "../../../../draft/domain/errors/DraftWithIdAlreadyExistsError.ts";
import { DraftWithUserNotFoundError } from "../../../../draft/domain/errors/DraftWithUserNotFoundError.ts";
import { SAMPLE_DRAFT } from "../../../../shared/utils/domain/fixtures/drafts.ts";

describe("Create draft use case tests", () => {
  beforeEach(() => {
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

  const createDraft = new CreateDraft(draftRepo, userRepo);

  it("Should create a draft succesfully", async () => {
    await createDraft.run(
      SAMPLE_DRAFT.id,
      SAMPLE_DRAFT.userId,
      SAMPLE_DRAFT.title,
      SAMPLE_DRAFT.description,
      SAMPLE_DRAFT.createdAt,
      SAMPLE_DRAFT.play
    );
    expect(draftRepo.create).toBeCalledTimes(1);
  });

  it("should not create a draft if user does not exist", async () => {
    userRepo.existsWithId = vi.fn().mockResolvedValue(false);

    await expect(
      async () =>
        await createDraft.run(
          SAMPLE_DRAFT.id,
          SAMPLE_DRAFT.userId,
          SAMPLE_DRAFT.title,
          SAMPLE_DRAFT.description,
          SAMPLE_DRAFT.createdAt,
          SAMPLE_DRAFT.play
        )
    ).rejects.toThrow(DraftWithUserNotFoundError);
  });

  it("should not create a draft if id is already used", async () => {
    draftRepo.existsWithId = vi.fn().mockResolvedValue(true);

    await expect(
      async () =>
        await createDraft.run(
          SAMPLE_DRAFT.id,
          SAMPLE_DRAFT.userId,
          SAMPLE_DRAFT.title,
          SAMPLE_DRAFT.description,
          SAMPLE_DRAFT.createdAt,
          SAMPLE_DRAFT.play
        )
    ).rejects.toThrow(DraftWithIdAlreadyExistsError);
  });
});
