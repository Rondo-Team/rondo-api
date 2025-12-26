import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../../../utils/clearTestDatabase.ts";
import {
  loginUser,
  registerUser,
} from "../../../../utils/userAuthentication.ts";

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

describe("delete user by id endpoint tests", () => {
  it("should delete a user by id", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    const res = await app.request(`/api/v1/users/${MANOLO_LOPEZ.id}`, {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    expect(res.status).toBe(200);
  });
});

it("does not delete a user by id if id was not found", async () => {
  await registerUser(MANOLO_LOPEZ);
  const accessToken = await loginUser(MANOLO_LOPEZ);

  const res = await app.request(`/api/v1/users/${PEDRO_MARTINEZ.id}`, {
    method: "GET",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });

  expect(res.status).toBe(404);
});

it("does not delete a user by id if user deleting is different from user to delete", async () => {
  await registerUser(MANOLO_LOPEZ);
  await registerUser(PEDRO_MARTINEZ);
  const accessToken = await loginUser(PEDRO_MARTINEZ);

  const res = await app.request(`/api/v1/users/${MANOLO_LOPEZ.id}`, {
    method: "DELETE",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });

  expect(res.status).toBe(401);
});
