import { beforeEach, describe, expect, it, vi } from "vitest";
import { DeleteDraftById } from "../../../../draft/application/use-cases/DeleteDraftById.ts";
import { DraftNotFoundByIdError } from "../../../../draft/domain/errors/DraftNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { RecentlyViewedItemType } from "../../../../shared/domain/types/RecentlyViewedItemType.ts";
import { TWO_STEPS_DRAFT } from "../../../../shared/utils/domain/fixtures/drafts.ts";
import { PEDRO_MARTINEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { User } from "../../../../user/domain/User.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Delete draft by id use case tests", () => {
  const buildOwner = () =>
    User.fromPrimitives({
      id: TWO_STEPS_DRAFT.userId,
      email: "owner@deletedraftbyid.test",
      username: "draftowner",
      name: "Draft Owner",
      profilePicture: "https://example.com/picture.png",
      password: "hashed-value-extra-extralarge",
      postsCount: 0,
      proposalsCount: 0,
      favouritePostsCount: 0,
      commentsCount: 0,
      createdAt: new Date("2020-01-01"),
      usernameChangedAt: new Date("2020-01-01"),
      recentlyViewedContent: [
        {
          id: TWO_STEPS_DRAFT.id,
          type: RecentlyViewedItemType.DRAFT,
          openedAt: new Date("2020-01-01"),
        },
      ],
    });

  beforeEach(() => {
    const mockDraft = {
      ...TWO_STEPS_DRAFT,
      userId: new UserId(TWO_STEPS_DRAFT.userId),
    };
    draftRepo.getOneById = vi.fn().mockResolvedValue(mockDraft);
    userRepo.getOneById = vi.fn().mockResolvedValue(buildOwner());
    userRepo.existsWithId = vi.fn().mockResolvedValue(true);
    userRepo.edit = vi.fn().mockResolvedValue(undefined);
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

  const deleteDraftById = new DeleteDraftById(draftRepo, userRepo);

  it("Should delete a draft succesfully", async () => {
    await deleteDraftById.run(TWO_STEPS_DRAFT.id, TWO_STEPS_DRAFT.userId);
    expect(draftRepo.deleteById).toBeCalledTimes(1);
  });

  it("removes the deleted draft from the user's recently viewed content", async () => {
    await deleteDraftById.run(TWO_STEPS_DRAFT.id, TWO_STEPS_DRAFT.userId);

    expect(userRepo.edit).toBeCalledTimes(1);
    const editedUser = userRepo.edit.mock.calls[0][0] as User;
    expect(editedUser.recentlyViewedContent.toPrimitives()).toEqual([]);
  });

  it("should not delete a draft if user does not own it", async () => {
    userRepo.existsWithId = vi.fn().mockResolvedValue(true);

    await expect(
      async () =>
        await deleteDraftById.run(TWO_STEPS_DRAFT.id, PEDRO_MARTINEZ.id),
    ).rejects.toThrow(UnauthorizedUserActionError);
  });

  it("should not delete a draft if it does not exist", async () => {
    draftRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () =>
        await deleteDraftById.run(TWO_STEPS_DRAFT.id, TWO_STEPS_DRAFT.userId),
    ).rejects.toThrow(DraftNotFoundByIdError);
  });
});
