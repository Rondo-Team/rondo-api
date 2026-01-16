import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../config/domain/Token.ts";
import { container } from "../../../../container.ts";
import { SAMPLE_COMMENT_FAVOURITE } from "../../../../shared/utils/domain/fixtures/commentFavourite.ts";
import { SAMPLE_PARENT_COMMENT } from "../../../../shared/utils/domain/fixtures/comments.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../../utils/clearTestDatabase.ts";
import { insertComment } from "../../../utils/insertComment.ts";
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

describe("mark comment as favourite endpoint tests", () => {
  it("should mark a comment as favourite successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);
    await insertPost(ONE_STEP_POST);
    await insertComment(SAMPLE_PARENT_COMMENT);

    const res = await app.request("/api/v1/comment-favourites", {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: SAMPLE_COMMENT_FAVOURITE.id,
        commentId: SAMPLE_COMMENT_FAVOURITE.commentId,
      }),
    });
    expect(res.status).toBe(201);
  });

  it("should not mark a comment as favourite if it does not exist", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    const res = await app.request("/api/v1/comment-favourites", {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: SAMPLE_COMMENT_FAVOURITE.id,
        commentId: SAMPLE_PARENT_COMMENT.id,
      }),
    });

    expect(res.status).toBe(404);
  });
});