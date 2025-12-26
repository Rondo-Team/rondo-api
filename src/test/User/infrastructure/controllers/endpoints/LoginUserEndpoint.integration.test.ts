import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import { MANOLO_LOPEZ } from "../../../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../../../utils/clearTestDatabase.ts";
import { registerUser } from "../../../../utils/userAuthentication.ts";

let app;

beforeAll(async () => {
  app = await container.getAsync(Token.APP);
});

beforeEach(async () => {
  await clearTestDatabase();
});

afterAll(async () => {
  await clearTestDatabase();
});

describe("login user endpoint tests", () => {
  it("should login a user successfully", async () => {
    registerUser(MANOLO_LOPEZ);

    const res = await app.request("/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: MANOLO_LOPEZ.email,
        password: MANOLO_LOPEZ.password,
      }),
    });

    expect(res.status).toBe(201);
  });
});

it("should not login a user with a non existent email", async () => {
  const res = await app.request("/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "nonexisting@email.com",
      password: MANOLO_LOPEZ.password,
    }),
  });

  expect(res.status).toBe(404);
});

it("should not log in user with incorrect password", async () => {
  await registerUser(MANOLO_LOPEZ);

  const res = await app.request("/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: MANOLO_LOPEZ.email,
      password: "incorrectpass",
    }),
  });

  expect(res.status).toBe(401);
});
