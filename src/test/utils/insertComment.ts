import type { CreateComment } from "../../comment/application/use-cases/CreateComment.ts";
import { Token } from "../../config/domain/Token.ts";
import { container } from "../../container.ts";

type TestComment = {
  id: string;
  postId: string;
  userId: string;
  message: string;
  favouritesCount: number;
  parentId: string | null;
  createdAt: Date;
};

export async function insertComment(COMMENT: TestComment) {
  const createComment = await container.getAsync<CreateComment>(
    Token.CREATE_COMMENT
  );
  await createComment.run(
    COMMENT.id,
    COMMENT.userId,
    COMMENT.postId,
    COMMENT.message,
    COMMENT.favouritesCount,
    COMMENT.createdAt
  );
}
