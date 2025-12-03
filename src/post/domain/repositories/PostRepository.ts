import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { Post } from "../Post.ts";
import { PostFilters } from "../value-objects/PostFilters.ts";
import { PostId } from "../value-objects/PostId.ts";

export interface PostRepository {
  create(post: Post): Promise<void>;
  getOneById(id: PostId): Promise<Post | undefined>;
  getAll(): Promise<Post[] | undefined>;
  getAllByUserId(userId: UserId): Promise<Post[] | undefined>;
  existsWithId(postId: PostId): Promise<boolean>;
  edit(post: Post): Promise<void>;
  deleteById(id: PostId): Promise<void>;
  search(filters: PostFilters);
}
