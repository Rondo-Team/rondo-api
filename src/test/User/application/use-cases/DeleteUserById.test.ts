import { describe, expect, it, vi } from "vitest";
import { UnauthorizedUserActionError } from "../../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../../shared/utils/domain/fixtures/users.ts";
import { DeleteUserById } from "../../../../user/application/use-cases/DeleteUserById.ts";

describe("Delete user by id use case tests", () => {
  const userRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    getOneByEmail: vi.fn(),
    existsWithId: vi.fn().mockResolvedValue(true),
    existsWithEmail: vi.fn(),
    existsWithUsername: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
  };

  const deleteUserById = new DeleteUserById(userRepo);

  it("Should delete a user succesfully", async () => {
    await deleteUserById.run(MANOLO_LOPEZ.id, MANOLO_LOPEZ.id);

    expect(userRepo.deleteById).toBeCalledTimes(1);
  });

  it("Should not delete a user if actor is not the user to delete", async () => {
    await expect(
      async () => await deleteUserById.run(MANOLO_LOPEZ.id, PEDRO_MARTINEZ.id)
    ).rejects.toThrow(UnauthorizedUserActionError);
  });
});
