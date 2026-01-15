import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../config/domain/Token.ts";
import { container } from "../../../container.ts";
import { SAMPLE_PARENT_COMMENT } from "../../../shared/utils/domain/fixtures/comments.ts";
import { ONE_STEP_POST } from "../../../shared/utils/domain/fixtures/posts.ts";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../utils/clearTestDatabase.ts";
import { insertComment } from "../../utils/insertComment.ts";
import { insertPost } from "../../utils/insertPost.ts";
import { loginUser, registerUser } from "../../utils/userAuthentication.ts";

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

describe("delete comment endpoint tests", () => {
  it("should delete a comment successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);
    await insertPost(ONE_STEP_POST);
    await insertComment(SAMPLE_PARENT_COMMENT);

    const res = await app.request(
      `/api/v1/comment/${SAMPLE_PARENT_COMMENT.id}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      }
    );

    expect(res.status).toBe(200);
  });

  it("should not delete a comment if it does not exist", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    const res = await app.request(
      `/api/v1/comment/${SAMPLE_PARENT_COMMENT.id}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      }
    );

    expect(res.status).toBe(404);
  });

  it("should not delete a comment if user is not the owner", async () => {
    await registerUser(MANOLO_LOPEZ);
    await registerUser(PEDRO_MARTINEZ);
    const accessToken = await loginUser(PEDRO_MARTINEZ);
    await insertPost(ONE_STEP_POST);
    await insertComment(SAMPLE_PARENT_COMMENT);

    const res = await app.request(
      `/api/v1/comment/${SAMPLE_PARENT_COMMENT.id}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      }
    );

    expect(res.status).toBe(401);
  });
});
