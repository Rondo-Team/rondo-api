import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { Post } from "../Post.ts";
import type { PostCriteriaOptions } from "../value-objects/PostCriteriaOptions.ts";
import { PostId } from "../value-objects/PostId.ts";

export interface PostRepository {
  create(post: Post): Promise<void>;
  getOneById(postId: PostId): Promise<Post | undefined>;
  getAllByUserId(userId: UserId): Promise<Post[]>;
  existsWithId(postId: PostId): Promise<boolean>;
  edit(post: Post): Promise<void>;
  deleteById(id: PostId): Promise<void>;
  getByCriteria(criteria: PostCriteriaOptions): Promise<Post[]>;
}
