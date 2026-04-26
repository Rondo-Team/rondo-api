import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../config/domain/Token.ts";
import { container } from "../../../../container.ts";
import { ONE_STEP_POST_FAVOURITE } from "../../../../shared/utils/domain/fixtures/postFavourites.ts";
import {
  ONE_STEP_POST,
  TWO_STEPS_POST,
} from "../../../../shared/utils/domain/fixtures/posts.ts";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../../utils/clearTestDatabase.ts";
import { insertPost } from "../../../utils/insertPost.ts";
import { insertPostFavourite } from "../../../utils/insertPostFavourite.ts";
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

describe("check if authenticated user has liked a post endpoint tests", () => {
  it("should return true when authenticated user has liked the post", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);
    await insertPost(ONE_STEP_POST);
    await insertPostFavourite(ONE_STEP_POST_FAVOURITE);

    const res = await app.request(
      `/api/v1/post-favourites/me/post/${ONE_STEP_POST_FAVOURITE.postId}`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const body = await res.json();
    expect(res.status).toBe(201);
    expect(body).toEqual({ isLiked: true });
  });

  it("should return false when authenticated user has not liked the post", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);
    await insertPost(ONE_STEP_POST);

    const res = await app.request(
      `/api/v1/post-favourites/me/post/${ONE_STEP_POST.id}`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const body = await res.json();
    expect(res.status).toBe(201);
    expect(body).toEqual({ isLiked: false });
  });

  it("should not check if post does not exists", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    const res = await app.request(
      `/api/v1/post-favourites/me/post/${TWO_STEPS_POST.id}`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    expect(res.status).toBe(404);
  });
});
