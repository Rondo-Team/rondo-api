import type { PostDetailReadModel } from "../read-models/PostDetailReadModel.ts";
import { PostId } from "../value-objects/PostId.ts";

export interface PostReadModelRepository {
  getOneById(id: PostId): Promise<PostDetailReadModel | undefined>;
  // getAll(): Promise<Post[]>;
  // getAllByUserId(userId: UserId): Promise<Post[]>;
  // getByCriteria(criteria: PostCriteriaOptions): Promise<Post[]>;
}
