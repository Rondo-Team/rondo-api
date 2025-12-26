import { beforeEach, describe, expect, it, vi } from "vitest";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { RegisterUser } from "../../../../user/application/use-cases/RegisterUser.ts";
import { UserWithEmailAlreadyExistsError } from "../../../../user/domain/errors/UserWithEmailAlreadyExistsError.ts";
import { UserWithIdAlreadyExistsError } from "../../../../user/domain/errors/UserWithIdAlreadyExistsError.ts";
import { UserWithUsernameAlreadyExistsError } from "../../../../user/domain/errors/UserWithUsernameAlreadyExistsError.ts";

describe("Register user use case tests", () => {
  beforeEach(() => {
    repo.existsWithEmail = vi.fn().mockResolvedValue(false);
    repo.existsWithId = vi.fn().mockResolvedValue(false);
    repo.existsWithUsername = vi.fn().mockResolvedValue(false);
  });

  const repo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    getOneByEmail: vi.fn(),
    existsWithId: vi.fn(),
    existsWithEmail: vi.fn(),
    existsWithUsername: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
  };

  const hasher = {
    hash: vi.fn().mockResolvedValue("a".repeat(50)),
    compare: vi.fn(),
  };

  const registerUser = new RegisterUser(repo, hasher);

  it("Should create a user succesfully", async () => {
    await registerUser.run(
      MANOLO_LOPEZ.id,
      MANOLO_LOPEZ.email,
      MANOLO_LOPEZ.username,
      MANOLO_LOPEZ.name,
      MANOLO_LOPEZ.profilePicture,
      MANOLO_LOPEZ.password,
      MANOLO_LOPEZ.postsCount,
      MANOLO_LOPEZ.proposalsCount,
      MANOLO_LOPEZ.favouritePostsCount,
      MANOLO_LOPEZ.commentsCount,
      MANOLO_LOPEZ.createdAt
    );
    expect(repo.create).toBeCalledTimes(1);
  });

  it("Should not create a user if email already exists", async () => {
    repo.existsWithEmail = vi.fn().mockResolvedValue(true);

    expect(
      async () =>
        await registerUser.run(
          MANOLO_LOPEZ.id,
          MANOLO_LOPEZ.email,
          MANOLO_LOPEZ.username,
          MANOLO_LOPEZ.name,
          MANOLO_LOPEZ.profilePicture,
          MANOLO_LOPEZ.password,
          MANOLO_LOPEZ.postsCount,
          MANOLO_LOPEZ.proposalsCount,
          MANOLO_LOPEZ.favouritePostsCount,
          MANOLO_LOPEZ.commentsCount,
          MANOLO_LOPEZ.createdAt
        )
    ).rejects.toThrow(UserWithEmailAlreadyExistsError);
  });
  it("Should not create a user if id already exists", async () => {
    repo.existsWithId = vi.fn().mockResolvedValue(true);

    expect(
      async () =>
        await registerUser.run(
          MANOLO_LOPEZ.id,
          MANOLO_LOPEZ.email,
          MANOLO_LOPEZ.username,
          MANOLO_LOPEZ.name,
          MANOLO_LOPEZ.profilePicture,
          MANOLO_LOPEZ.password,
          MANOLO_LOPEZ.postsCount,
          MANOLO_LOPEZ.proposalsCount,
          MANOLO_LOPEZ.favouritePostsCount,
          MANOLO_LOPEZ.commentsCount,
          MANOLO_LOPEZ.createdAt
        )
    ).rejects.toThrow(UserWithIdAlreadyExistsError);
  });

  it("Should not create a user if username already exists", async () => {
    repo.existsWithUsername = vi.fn().mockResolvedValue(true);

    expect(
      async () =>
        await registerUser.run(
          MANOLO_LOPEZ.id,
          MANOLO_LOPEZ.email,
          MANOLO_LOPEZ.username,
          MANOLO_LOPEZ.name,
          MANOLO_LOPEZ.profilePicture,
          MANOLO_LOPEZ.password,
          MANOLO_LOPEZ.postsCount,
          MANOLO_LOPEZ.proposalsCount,
          MANOLO_LOPEZ.favouritePostsCount,
          MANOLO_LOPEZ.commentsCount,
          MANOLO_LOPEZ.createdAt
        )
    ).rejects.toThrow(UserWithUsernameAlreadyExistsError);
  });
});
