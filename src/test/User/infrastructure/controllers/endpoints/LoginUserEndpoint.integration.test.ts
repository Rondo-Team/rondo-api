import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import { clearTestDatabase } from "../../../../utils/clearTestDatabase.ts";

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
    // Create user
    await app.request("/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "123e4567-e89b-12d3-a456-426614174000",
        email: "example@gmail.com",
        username: "example",
        name: "Example",
        password: "PasswordExample10_",
      }),
    });

    const res = await app.request("/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "example@gmail.com",
        password: "PasswordExample10_",
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
      email: "example@gmail.com",
      password: "PasswordExample10_",
    }),
  });

  expect(res.status).toBe(404);
});

it("should not log in user with incorrect password", async () => {
  // Insert first element
  await app.request("/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: "123e4567-e89b-12d3-a456-426614174000",
      email: "example@gmail.com",
      username: "example",
      name: "Example",
      password: "PasswordExample10_",
    }),
  });

  const res = await app.request("/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "example@gmail.com",
      password: "PasswordExample10",
    }),
  });

  expect(res.status).toBe(401);
});
