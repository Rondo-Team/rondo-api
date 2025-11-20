import { UserId } from "@/user/domain/value-objects/UserId";
import { Post } from "../Post";
import { PostId } from "../value-objects/PostId";

export interface PostRepository {
  create(post: Post): Promise<void>;
  getOneById(id: PostId): Promise<Post | undefined>;
  getAll(): Promise<Post[] | undefined>;
  getAllByUserId(userId: UserId): Promise<Post[] | undefined>;
  existsWithId(postId: PostId): Promise<boolean>
  edit(post: Post): Promise<void>;
  deleteById(id: PostId): Promise<void>;
}
