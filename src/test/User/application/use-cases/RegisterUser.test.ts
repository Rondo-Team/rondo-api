import { describe, expect, it, vi } from "vitest";
import { RegisterUser } from "../../../../user/application/use-cases/RegisterUser.ts";

describe("Register user use case tests", () => {
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
      "123e4567-e89b-12d3-a456-426614174000",
      "example@gmail.com",
      "example",
      "Example",
      "https://example-picture.com",
      "PasswordExample10_",
      0,
      0,
      0,
      0,
      new Date()
    );
    expect(repo.create).toBeCalledTimes(1);
  });
});
