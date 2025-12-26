import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../../shared/utils/domain/fixtures/users.ts";
import { UpdateUserProfile } from "../../../../user/application/use-cases/UpdateUserProfile.ts";
import { UnauthorizedUserActionError } from "../../../../user/domain/errors/UnauthorizedUserActionError.ts";

describe("Update user profile use case tests", () => {
  beforeEach(() => {
    const mockUser = {
      ...MANOLO_LOPEZ,
      changeName: vi.fn(),
      changeProfilePicture: vi.fn(),
    };
    userRepo.getOneById = vi.fn().mockResolvedValue(mockUser);
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

  const updateUserProfile = new UpdateUserProfile(userRepo);

  it("Should update a user succesfully", async () => {
    await updateUserProfile.run(
      MANOLO_LOPEZ.id,
      MANOLO_LOPEZ.id,
      PEDRO_MARTINEZ.name,
      PEDRO_MARTINEZ.profilePicture
    );

    expect(userRepo.edit).toBeCalledTimes(1);
  });

  it("Should not get a user actor is not the objective", async () => {
    expect(
      async () =>
        await updateUserProfile.run(
          MANOLO_LOPEZ.id,
          PEDRO_MARTINEZ.id,
          PEDRO_MARTINEZ.name,
          PEDRO_MARTINEZ.profilePicture
        )
    ).rejects.toThrow(UnauthorizedUserActionError);
  });
});
