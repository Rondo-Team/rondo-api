import { Post } from "../Post.ts";
import { PostId } from "../value-objects/PostId.ts";

export interface PostRepository {
  create(post: Post): Promise<void>;
  getOneById(postId: PostId): Promise<Post | undefined>; // Do not migrate since its used in internal operations, will be needed until Domain Events implementation
  existsWithId(postId: PostId): Promise<boolean>;
  edit(post: Post): Promise<void>;
  deleteById(id: PostId): Promise<void>;
}
