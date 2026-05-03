import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import type { CommentReadModel } from "../read-models/CommentReadModel.ts";
import { CommentId } from "../value-objects/CommentId.ts";

export interface CommentReadModelRepository {
  getOneById(commentId: CommentId): Promise<CommentReadModel | undefined>;
  getAllByPostId(postId: PostId): Promise<CommentReadModel[]>;
}
