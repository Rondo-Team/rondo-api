import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import { ONE_STEP_POST } from "../../../../../shared/utils/domain/fixtures/posts.ts";
import {
  MANOLO_LOPEZ,
  ROBERTO_PEREZ,
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

describe("get posts by user id endpoint tests", () => {
  it("should get all post from a user by id successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    await insertPost(ONE_STEP_POST);

    const res = await app.request(`/api/v1/posts/all/${ONE_STEP_POST.userId}`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    expect(res.status).toBe(200);
  });
});

it("should not get a post by user id if user does not exists", async () => {
  await registerUser(MANOLO_LOPEZ);
  const accessToken = await loginUser(MANOLO_LOPEZ);

  const res = await app.request(`/api/v1/posts/all/${ROBERTO_PEREZ.id}`, {
    method: "POST",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  expect(res.status).toBe(404);
});
