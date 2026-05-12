import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { CommentFavouriteRepository } from "../../../../comment/comment-favourite/domain/repositories/CommentFavouriteRepository.ts";
import { Token } from "../../../../config/domain/Token.ts";
import { container } from "../../../../container.ts";
import { PostId } from "../../../../post/domain/value-objects/PostId.ts";
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
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";
import { clearTestDatabase } from "../../../utils/clearTestDatabase.ts";
import { insertComment } from "../../../utils/insertComment.ts";
import { insertCommentFavourite } from "../../../utils/insertCommentFavourite.ts";
import { insertPost } from "../../../utils/insertPost.ts";
import { registerUser } from "../../../utils/userAuthentication.ts";

let commentFavouriteRepository: CommentFavouriteRepository;

beforeAll(async () => {
  commentFavouriteRepository =
    await container.getAsync<CommentFavouriteRepository>(
      Token.COMMENT_FAVOURITE_REPOSITORY,
    );
});

beforeEach(async () => {
  await clearTestDatabase();
});

afterAll(async () => {
  await clearTestDatabase();
});

describe("MongoCommentFavouriteRepository getAllByUserIdAndPostId method tests", () => {
  it("should get only comment favourites of a user in a specific post", async () => {
    const secondComment = {
      ...SAMPLE_PARENT_COMMENT,
      id: "5ccba252-b534-4741-8f49-612d78a58969",
      postId: TWO_STEPS_POST.id,
    };

    await registerUser(MANOLO_LOPEZ);
    await registerUser(PEDRO_MARTINEZ);

    await insertPost(ONE_STEP_POST);
    await insertPost(TWO_STEPS_POST);

    await insertComment(SAMPLE_PARENT_COMMENT);
    await insertComment(secondComment);

    await insertCommentFavourite(SAMPLE_COMMENT_FAVOURITE);
    await insertCommentFavourite({
      ...SAMPLE_COMMENT_FAVOURITE,
      id: "ce1ade6e-4230-4a0d-851c-81c9d9427040",
      commentId: secondComment.id,
    });
    await insertCommentFavourite({
      ...SAMPLE_COMMENT_FAVOURITE,
      id: "ce1ade6e-4230-4a0d-851c-81c9d9427041",
      userId: PEDRO_MARTINEZ.id,
    });

    const result = await commentFavouriteRepository.getAllByUserIdAndPostId(
      UserId.fromPrimitives(MANOLO_LOPEZ.id),
      PostId.fromPrimitives(ONE_STEP_POST.id),
    );

    expect(result.length).toBe(1);
    expect(result[0].toPrimitives().commentId).toBe(SAMPLE_PARENT_COMMENT.id);
    expect(result[0].toPrimitives().userId).toBe(MANOLO_LOPEZ.id);
  });

  it("should return empty array when there are no favourites for the user in that post", async () => {
    await registerUser(MANOLO_LOPEZ);
    await insertPost(ONE_STEP_POST);
    await insertComment(SAMPLE_PARENT_COMMENT);

    const result = await commentFavouriteRepository.getAllByUserIdAndPostId(
      UserId.fromPrimitives(MANOLO_LOPEZ.id),
      PostId.fromPrimitives(ONE_STEP_POST.id),
    );

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});
