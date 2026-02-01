import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../config/domain/Token.ts";
import { container } from "../../../../container.ts";
import { ONE_STEP_POST_FAVOURITE } from "../../../../shared/utils/domain/fixtures/postFavourites.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../../utils/clearTestDatabase.ts";
import { insertPost } from "../../../utils/insertPost.ts";
import { loginUser, registerUser } from "../../../utils/userAuthentication.ts";

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

describe("mark post as favourite endpoint tests", () => {
  it("should mark a post as favourite successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);
    await insertPost(ONE_STEP_POST);

    const res = await app.request("/api/v1/post-favourites", {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ONE_STEP_POST_FAVOURITE.id,
        postId: ONE_STEP_POST_FAVOURITE.postId,
      }),
    });
    expect(res.status).toBe(201);
  });
});

it("should not mark a post as favourite if it does not exists", async () => {
  await registerUser(MANOLO_LOPEZ);
  const accessToken = await loginUser(MANOLO_LOPEZ);

  const res = await app.request("/api/v1/post-favourites", {
    method: "POST",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: ONE_STEP_POST_FAVOURITE.id,
      postId: ONE_STEP_POST.id,
    }),
  });

  expect(res.status).toBe(404);
});
