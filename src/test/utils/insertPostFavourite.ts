import { Token } from "../../config/domain/Token.ts";
import { container } from "../../container.ts";
import { MarkPostAsFavourite } from "../../post/post-favourite/application/use-cases/MarkPostAsFavourite.ts";

type TestPostFavourite = {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
};

export async function insertPostFavourite(
  TEST_POST_FAVOURITE: TestPostFavourite
) {
  const markPostAsFavourite = await container.getAsync<MarkPostAsFavourite>(
    Token.MARK_POST_AS_FAVOURITE
  );

  await markPostAsFavourite.run(
    TEST_POST_FAVOURITE.id,
    TEST_POST_FAVOURITE.userId,
    TEST_POST_FAVOURITE.createdAt,
    TEST_POST_FAVOURITE.postId
  );
}
