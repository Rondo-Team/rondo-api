import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../config/domain/Token.ts";
import { container } from "../../../../container.ts";
import { SAMPLE_COMMENT_FAVOURITE } from "../../../../shared/utils/domain/fixtures/commentFavourite.ts";
import { SAMPLE_PARENT_COMMENT } from "../../../../shared/utils/domain/fixtures/comments.ts";
import {
  ONE_STEP_POST,
  TWO_STEPS_POST,
} from "../../../../shared/utils/domain/fixtures/posts.ts";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../../utils/clearTestDatabase.ts";
import { insertComment } from "../../../utils/insertComment.ts";
import { insertCommentFavourite } from "../../../utils/insertCommentFavourite.ts";
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

describe("get all comment favourites by user id and post id endpoint tests", () => {
  it("should retrieve all comment favourites for a user in a specific post", async () => {
    const secondComment = {
      ...SAMPLE_PARENT_COMMENT,
      id: "5ccba252-b534-4741-8f49-612d78a58968",
      postId: TWO_STEPS_POST.id,
    };

    await registerUser(MANOLO_LOPEZ);
    await registerUser(PEDRO_MARTINEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    await insertPost(ONE_STEP_POST);
    await insertPost(TWO_STEPS_POST);

    await insertComment(SAMPLE_PARENT_COMMENT);
    await insertComment(secondComment);

    await insertCommentFavourite(SAMPLE_COMMENT_FAVOURITE);
    await insertCommentFavourite({
      ...SAMPLE_COMMENT_FAVOURITE,
      id: "ce1ade6e-4230-4a0d-851c-81c9d9427038",
      commentId: secondComment.id,
    });
    await insertCommentFavourite({
      ...SAMPLE_COMMENT_FAVOURITE,
      id: "ce1ade6e-4230-4a0d-851c-81c9d9427039",
      userId: PEDRO_MARTINEZ.id,
      commentId: SAMPLE_PARENT_COMMENT.id,
    });

    const res = await app.request(
      `/api/v1/comment-favourites?postId=${ONE_STEP_POST.id}`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      },
    );

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(1);
    expect(data[0].commentId).toBe(SAMPLE_PARENT_COMMENT.id);
    expect(data[0].userId).toBe(MANOLO_LOPEZ.id);
  });

  it("should return empty array when user has no favourites in that post", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    await insertPost(ONE_STEP_POST);
    await insertComment(SAMPLE_PARENT_COMMENT);

    const res = await app.request(
      `/api/v1/comment-favourites?postId=${ONE_STEP_POST.id}`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      },
    );

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });
});
