import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetDraftById } from "../../../../draft/application/use-cases/GetDraftById.ts";
import { Draft } from "../../../../draft/domain/Draft.ts";
import { DraftNotFoundByIdError } from "../../../../draft/domain/errors/DraftNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { RecentlyViewedItemType } from "../../../../shared/domain/types/RecentlyViewedItemType.ts";
import { TWO_STEPS_DRAFT } from "../../../../shared/utils/domain/fixtures/drafts.ts";
import { PEDRO_MARTINEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { User } from "../../../../user/domain/User.ts";

describe("Get draft by id use case tests", () => {
  beforeEach(() => {
    const mockDraft = Draft.fromPrimitives(TWO_STEPS_DRAFT);
    const mockUser = User.fromPrimitives({
      id: TWO_STEPS_DRAFT.userId,
      email: "user@getdraftbyid.test",
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
      recentlyViewedContent: [],
    });

    draftRepo.getOneById = vi.fn().mockResolvedValue(mockDraft);
    userRepo.getOneById = vi.fn().mockResolvedValue(mockUser);
    userRepo.existsWithId = vi.fn().mockResolvedValue(true);
    draftRepo.existsWithId = vi.fn().mockResolvedValue(false);
    userRepo.edit = vi.fn().mockResolvedValue(undefined);
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

  const getDraftById = new GetDraftById(draftRepo, userRepo);

  it("Should get a draft succesfully", async () => {
    await getDraftById.run(TWO_STEPS_DRAFT.id, TWO_STEPS_DRAFT.userId);

    expect(draftRepo.getOneById).toBeCalledTimes(1);
    expect(userRepo.edit).toBeCalledTimes(1);
    expect(userRepo.edit).toHaveBeenCalledWith(
      expect.objectContaining({
        recentlyViewedContent: expect.objectContaining({
          toPrimitives: expect.any(Function),
        }),
      }),
    );

    const editedUser = vi.mocked(userRepo.edit).mock.calls[0][0] as User;
    expect(editedUser.recentlyViewedContent.toPrimitives()).toEqual([
      { id: TWO_STEPS_DRAFT.id, type: RecentlyViewedItemType.DRAFT },
    ]);
  });

  it("should not get a draft if user does not own it", async () => {
    userRepo.existsWithId = vi.fn().mockResolvedValue(true);

    await expect(
      async () => await getDraftById.run(TWO_STEPS_DRAFT.id, PEDRO_MARTINEZ.id),
    ).rejects.toThrow(UnauthorizedUserActionError);

    expect(userRepo.edit).not.toBeCalled();
  });

  it("should not get a draft if it does not exist", async () => {
    draftRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () =>
        await getDraftById.run(TWO_STEPS_DRAFT.id, TWO_STEPS_DRAFT.userId),
    ).rejects.toThrow(DraftNotFoundByIdError);

    expect(userRepo.edit).not.toBeCalled();
  });
});
