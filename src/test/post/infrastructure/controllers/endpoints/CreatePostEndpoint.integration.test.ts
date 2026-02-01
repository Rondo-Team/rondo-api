import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import { ONE_STEP_POST } from "../../../../../shared/utils/domain/fixtures/posts.ts";
import { MANOLO_LOPEZ } from "../../../../../shared/utils/domain/fixtures/users.ts";
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

describe("create post endpoint tests", () => {
  it("should create a post successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    const res = await app.request("/api/v1/posts", {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ONE_STEP_POST.id,
        title: ONE_STEP_POST.title,
        description: ONE_STEP_POST.description,
        tags: ONE_STEP_POST.tags,
        play: ONE_STEP_POST.play,
      }),
    });
    expect(res.status).toBe(201);
  });
});

it("should not create post with an existent id", async () => {
  await registerUser(MANOLO_LOPEZ);
  const accessToken = await loginUser(MANOLO_LOPEZ);

  // Insert first element
  await insertPost(ONE_STEP_POST);

  // Insert second element
  const res = await app.request("/api/v1/posts", {
    method: "POST",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: ONE_STEP_POST.id,
      title: ONE_STEP_POST.title,
      description: ONE_STEP_POST.description,
      tags: ONE_STEP_POST.tags,
      play: ONE_STEP_POST.play,
    }),
  });

  expect(res.status).toBe(409);
});
