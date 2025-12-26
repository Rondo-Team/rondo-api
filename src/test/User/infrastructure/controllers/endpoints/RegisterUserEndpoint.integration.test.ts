import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../../../shared/utils/domain/fixtures/users.ts";
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

describe("create user endpoint tests", () => {
  it("should create a user successfully", async () => {
    const res = await app.request("/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: MANOLO_LOPEZ.id,
        email: MANOLO_LOPEZ.email,
        username: MANOLO_LOPEZ.username,
        name: MANOLO_LOPEZ.name,
        password: MANOLO_LOPEZ.password,
      }),
    });
    expect(res.status).toBe(201);
  });
});

it("should not create user with an existent id", async () => {
  // Insert first element
  await registerUser(MANOLO_LOPEZ);

  // Insert second element
  const res = await app.request("/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: MANOLO_LOPEZ.id,
      email: PEDRO_MARTINEZ.email,
      username: PEDRO_MARTINEZ.username,
      name: PEDRO_MARTINEZ.name,
      password: PEDRO_MARTINEZ.password,
    }),
  });

  expect(res.status).toBe(409);
});

it("should not create user with an existent email", async () => {
  // Insert first element
  await registerUser(MANOLO_LOPEZ);
  // Insert second element
  const res = await app.request("/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: PEDRO_MARTINEZ.id,
      email: MANOLO_LOPEZ.email,
      username: PEDRO_MARTINEZ.username,
      name: PEDRO_MARTINEZ.name,
      password: PEDRO_MARTINEZ.password,
    }),
  });

  expect(res.status).toBe(409);
});

it("should not create user with an existent username", async () => {
  // Insert first element
  await registerUser(MANOLO_LOPEZ);

  // Insert second element
  const res = await app.request("/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: PEDRO_MARTINEZ.id,
      email: PEDRO_MARTINEZ.email,
      username: MANOLO_LOPEZ.username,
      name: PEDRO_MARTINEZ.name,
      password: PEDRO_MARTINEZ.password,
    }),
  });

  expect(res.status).toBe(409);
});
