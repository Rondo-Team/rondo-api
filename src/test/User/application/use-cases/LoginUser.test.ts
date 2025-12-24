import { describe, expect, it, vi } from "vitest";
import { LoginUser } from "../../../../user/application/use-cases/LoginUser.ts";

describe("Login user use case tests", () => {
  const userRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    getOneByEmail: vi.fn().mockResolvedValue({
      id: {
        toPrimitives: () => "123e4567-e89b-12d3-a456-426614174002",
      },
      password: {
        toPrimitives: () => "hashed_password",
      },
    }),
    existsWithId: vi.fn(),
    existsWithEmail: vi.fn(),
    existsWithUsername: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
  };

  const hasher = {
    hash: vi.fn().mockResolvedValue("a".repeat(50)),
    compare: vi.fn().mockResolvedValue(true),
  };

  const tokenRepo = {
    sign: vi.fn(),
    verify: vi.fn(),
  };

  const loginUser = new LoginUser(userRepo, hasher, tokenRepo);

  it("Should log in a user succesfully", async () => {
    await loginUser.run("example@gmail.com", "PasswordExample10_");
    
    expect(userRepo.getOneByEmail).toBeCalledTimes(1);
    expect(hasher.compare).toBeCalledTimes(1);
    expect(tokenRepo.sign).toBeCalledTimes(2);
  });
});
