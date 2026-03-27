import { describe, expect, it, vi } from "vitest";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../../shared/utils/domain/fixtures/users.ts";
import { GetUserById } from "../../../../user/application/use-cases/GetUserById.ts";
import { UserNotFoundByIdError } from "../../../../user/domain/errors/UserNotFoundByIdError.ts";

describe("Get user by id use case tests", () => {
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

  const getUserById = new GetUserById(userRepo);

  it("Should get a user succesfully", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(MANOLO_LOPEZ);

    await getUserById.run(MANOLO_LOPEZ.id);

    expect(userRepo.getOneById).toBeCalledTimes(1);
  });

  it("Should throw an error if id does not exist", async () => {
    userRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(getUserById.run(PEDRO_MARTINEZ.id)).rejects.toThrow(
      UserNotFoundByIdError,
    );
  });
});
