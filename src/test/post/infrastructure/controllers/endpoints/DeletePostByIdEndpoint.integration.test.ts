import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import { ONE_STEP_POST } from "../../../../../shared/utils/domain/fixtures/posts.ts";
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

describe("delete post by id endpoint tests", () => {
  it("should delete a post by id successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    await insertPost(ONE_STEP_POST);

    const res = await app.request(`/api/v1/posts/${ONE_STEP_POST.id}`, {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    expect(res.status).toBe(200);
  });

  it("should not delete a post by id if it does not exists", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    const res = await app.request(`/api/v1/posts/${ONE_STEP_POST.id}`, {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    expect(res.status).toBe(404);
  });

  it("should not delete a post if user does not own it", async () => {
    await registerUser(MANOLO_LOPEZ);
    await registerUser(PEDRO_MARTINEZ);
    const accessToken = await loginUser(PEDRO_MARTINEZ);
    await insertPost(ONE_STEP_POST);

    const res = await app.request(`/api/v1/posts/${ONE_STEP_POST.id}`, {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    expect(res.status).toBe(401);
  });
});
