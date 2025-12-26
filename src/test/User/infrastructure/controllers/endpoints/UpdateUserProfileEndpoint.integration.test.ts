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

describe("update user profile endpoint tests", () => {
  it("should update a user profile", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    const res = await app.request(`/api/v1/users/${MANOLO_LOPEZ.id}`, {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: PEDRO_MARTINEZ.name,
        profilePicture: PEDRO_MARTINEZ.profilePicture,
      }),
    });

    expect(res.status).toBe(200);
  });
});

it("does not update a user by id if user updating is different from user to update", async () => {
  await registerUser(MANOLO_LOPEZ);
  await registerUser(PEDRO_MARTINEZ);
  const accessToken = await loginUser(PEDRO_MARTINEZ);

  const res = await app.request(`/api/v1/users/${MANOLO_LOPEZ.id}`, {
    method: "PATCH",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: PEDRO_MARTINEZ.name,
      profilePicture: PEDRO_MARTINEZ.profilePicture,
    }),
  });

  expect(res.status).toBe(401);
});
