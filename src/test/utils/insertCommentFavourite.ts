import { MarkCommentAsFavourite } from "../../comment/comment-favourite/application/MarkCommentAsFavourite.ts";
import { Token } from "../../config/domain/Token.ts";
import { container } from "../../container.ts";

type TestCommentFavourite = {
  id: string;
  userId: string;
  commentId: string;
  createdAt: Date;
};

export async function insertCommentFavourite(
  commentFavourite: TestCommentFavourite
) {
  const markCommentAsFavourite =
    await container.getAsync<MarkCommentAsFavourite>(
      Token.MARK_COMMENT_AS_FAVOURITE
    );

  await markCommentAsFavourite.run(
    commentFavourite.id,
    commentFavourite.userId,
    commentFavourite.createdAt,
    commentFavourite.commentId
  );
}
