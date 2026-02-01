import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../../shared/utils/domain/fixtures/users.ts";
import { ChangeUsername } from "../../../../user/application/use-cases/ChangeUsername.ts";
import { UsernameChangingCooldownError } from "../../../../user/domain/errors/UsernameChangingCooldownError.ts";
import { UserUsernameChangedAt } from "../../../../user/domain/value-objects/UserUsernameChangedAt.ts";

describe("Update username use case tests", () => {
  beforeEach(() => {
    const mockUser = {
      ...MANOLO_LOPEZ,
      usernameChangedAt: new UserUsernameChangedAt(
        MANOLO_LOPEZ.usernameChangedAt
      ),
      changeUsername: vi.fn(),
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

  const changeUsername = new ChangeUsername(userRepo);

  it("Should update username succesfully", async () => {
    await changeUsername.run(MANOLO_LOPEZ.id, PEDRO_MARTINEZ.username, 0);

    expect(userRepo.edit).toBeCalledTimes(1);
  });

  it("Should not update username succesfully because cooldow time has not elapsed", async () => {
    await expect(
      async () =>
        await changeUsername.run(
          MANOLO_LOPEZ.id,
          PEDRO_MARTINEZ.username,
          Infinity
        )
    ).rejects.toThrow(UsernameChangingCooldownError);
  });
});
