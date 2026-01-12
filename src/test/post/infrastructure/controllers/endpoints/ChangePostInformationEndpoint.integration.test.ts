import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import {
  ONE_STEP_POST,
  TWO_STEPS_POST,
} from "../../../../../shared/utils/domain/fixtures/posts.ts";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../../../utils/clearTestDatabase.ts";
import { insertPost } from "../../../../utils/insertPost.ts";
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

describe("change post information by id endpoint tests", () => {
  it("should change a post information by id successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);
    await insertPost(TWO_STEPS_POST);

    const res = await app.request(`/api/v1/posts/${TWO_STEPS_POST.id}/info`, {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newTitle: ONE_STEP_POST.title,
        newDescription: ONE_STEP_POST.description,
      }),
    });
    expect(res.status).toBe(200);
  });
});

it("should not change a post information if it does not exists", async () => {
  await registerUser(MANOLO_LOPEZ);
  const accessToken = await loginUser(MANOLO_LOPEZ);

  const res = await app.request(`/api/v1/posts/${TWO_STEPS_POST.id}/info`, {
    method: "PATCH",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newTitle: ONE_STEP_POST.title,
      newDescription: ONE_STEP_POST.description,
    }),
  });

  expect(res.status).toBe(404);
});

it("should not change a post information if user does not own it", async () => {
  await registerUser(PEDRO_MARTINEZ);
  await registerUser(MANOLO_LOPEZ);
  const accessToken = await loginUser(PEDRO_MARTINEZ);
  await insertPost(TWO_STEPS_POST);

  const res = await app.request(`/api/v1/posts/${TWO_STEPS_POST.id}/info`, {
    method: "PATCH",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newTitle: ONE_STEP_POST.title,
      newDescription: ONE_STEP_POST.description,
    }),
  });

  expect(res.status).toBe(401);
});
