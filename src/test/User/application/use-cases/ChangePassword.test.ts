import { beforeEach, describe, expect, it, vi } from "vitest";
import { HashedPassword } from "../../../../shared/password-hashing/domain/value-objects/HashedPassword.ts";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../../shared/utils/domain/fixtures/users.ts";
import { ChangePassword } from "../../../../user/application/use-cases/ChangePassword.ts";
import { IncorrectPasswordError } from "../../../../user/domain/errors/IncorrectPasswordError.ts";

describe("Update username use case tests", () => {
  beforeEach(() => {
    const mockUser = {
      ...MANOLO_LOPEZ,
      password: new HashedPassword(MANOLO_LOPEZ.password),
      changePassword: vi.fn(),
    };
    userRepo.getOneById = vi.fn().mockResolvedValue(mockUser);
    hasherRepo.compare = vi.fn().mockResolvedValue(true);
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

  const hasherRepo = {
    hash: vi.fn().mockResolvedValue("a".repeat(50)),
    compare: vi.fn(),
  };

  const changePassword = new ChangePassword(userRepo, hasherRepo);

  it("Should update username succesfully", async () => {
    await changePassword.run(
      MANOLO_LOPEZ.id,
      MANOLO_LOPEZ.password,
      PEDRO_MARTINEZ.password
    );

    expect(userRepo.edit).toBeCalledTimes(1);
  });

  it("Should not update username if current password is incorrect", async () => {
    hasherRepo.compare = vi.fn().mockResolvedValue(false);

    expect(async () => {
      await changePassword.run(
        MANOLO_LOPEZ.id,
        MANOLO_LOPEZ.password,
        PEDRO_MARTINEZ.password
      );
    }).rejects.toThrow(IncorrectPasswordError);
  });
});
