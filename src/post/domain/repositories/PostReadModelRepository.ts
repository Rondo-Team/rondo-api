import type { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { PostDetailReadModel } from "../read-models/PostDetailReadModel.ts";
import type { PostCriteriaOptions } from "../value-objects/PostCriteriaOptions.ts";
import { PostId } from "../value-objects/PostId.ts";

export interface PostReadModelRepository {
  getOneById(id: PostId): Promise<PostDetailReadModel | undefined>;
  getAll(): Promise<PostDetailReadModel[]>;
  getAllByUserId(userId: UserId): Promise<PostDetailReadModel[]>;
  getByCriteria(criteria: PostCriteriaOptions): Promise<PostDetailReadModel[]>;
  getMostRatedPostSinceDays(
    days: number,
  ): Promise<PostDetailReadModel | undefined>;
  getMostRatedPost(): Promise<PostDetailReadModel | undefined>;
}
