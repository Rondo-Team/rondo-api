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

describe("get user by id endpoint tests", () => {
  it("should get a user by id", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    const res = await app.request(`/api/v1/users/${MANOLO_LOPEZ.id}`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    expect(res.status).toBe(200);
  });
});

it("does not get a user by id if id was not found", async () => {
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
