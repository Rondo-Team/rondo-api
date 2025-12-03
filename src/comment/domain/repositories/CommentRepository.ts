import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { Comment } from "../Comment.ts";
import { CommentId } from "../value-objects/CommentId.ts";

export interface CommentRepository {
  create(comment: Comment): Promise<void>;
  getOneById(commentId: CommentId): Promise<Comment | undefined>;
  getAllByPostId(postId: PostId): Promise<Comment[] | undefined>;
  existsWithId(commentId: CommentId): Promise<boolean>;
  edit(comment: Comment): Promise<void>;
  deleteById(id: CommentId): Promise<void>;
}
