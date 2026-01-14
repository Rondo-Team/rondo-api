import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../config/domain/Token.ts";
import { container } from "../../../../container.ts";
import { ONE_STEP_POST_FAVOURITE } from "../../../../shared/utils/domain/fixtures/postFavourites.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
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

describe("unmark post as favourite endpoint tests", () => {
  it("should unmark a post as favourite successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);
    await insertPost(ONE_STEP_POST);
    await insertPostFavourite(ONE_STEP_POST_FAVOURITE);

    const res = await app.request(
      `/api/v1/post-favourites/${ONE_STEP_POST_FAVOURITE.id}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    expect(res.status).toBe(201);
  }, 100000);
});

it("should not mark a post as favourite if it does not exists", async () => {
  await registerUser(MANOLO_LOPEZ);
  const accessToken = await loginUser(MANOLO_LOPEZ);

  const res = await app.request(
    `/api/v1/post-favourites/${ONE_STEP_POST_FAVOURITE.id}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  expect(res.status).toBe(404);
});
