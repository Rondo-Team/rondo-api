import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../config/domain/Token.ts";
import { container } from "../../../../container.ts";
import { ONE_STEP_POST_FAVOURITE } from "../../../../shared/utils/domain/fixtures/postFavourites.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../../shared/utils/domain/fixtures/users.ts";
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

describe("get all favourites from a post by user id endpoint test", () => {
  it("should get all post favourites by user id successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);
    await insertPost(ONE_STEP_POST);
    await insertPostFavourite(ONE_STEP_POST_FAVOURITE);

    const res = await app.request(
      `/api/v1/post-favourites/user/${ONE_STEP_POST_FAVOURITE.userId}`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    expect(res.status).toBe(200);
  });
});

it("should not get all post favourites if user does not exists", async () => {
  await registerUser(MANOLO_LOPEZ);
  const accessToken = await loginUser(MANOLO_LOPEZ);
  await insertPost(ONE_STEP_POST);
  await insertPostFavourite(ONE_STEP_POST_FAVOURITE);

  const res = await app.request(
    `/api/v1/post-favourites/user/${PEDRO_MARTINEZ.id}`,
    {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  expect(res.status).toBe(404);
});

it("should not get all post favourites if user querying is not the one to list", async () => {
  await registerUser(MANOLO_LOPEZ);
  await registerUser(PEDRO_MARTINEZ);
  const accessToken = await loginUser(MANOLO_LOPEZ);
  await insertPost(ONE_STEP_POST);
  await insertPostFavourite(ONE_STEP_POST_FAVOURITE);

  const res = await app.request(
    `/api/v1/post-favourites/user/${PEDRO_MARTINEZ.id}`,
    {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  expect(res.status).toBe(401);
});
