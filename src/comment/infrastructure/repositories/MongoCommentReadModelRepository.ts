import type { ResolutionContext } from "inversify";
import { Collection, Db } from "mongodb";
import type { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { MongoCollections } from "../../../shared/persistance/infrastructure/mongo/MongoCollections.ts";
import type { UserPrimitives } from "../../../user/domain/User.ts";
import { type CommentPrimitives } from "../../domain/Comment.ts";
import type { CommentReadModel } from "../../domain/read-models/CommentReadModel.ts";
import type { CommentReadModelRepository } from "../../domain/repositories/CommentReadModelRepository.ts";
import type { CommentId } from "../../domain/value-objects/CommentId.ts";
import { mapDocumentToCommentReadModel } from "../utils/mapDocumentToCommentReadModel.ts";

export class MongoCommentReadModelRepository implements CommentReadModelRepository {
  private readonly comments: Collection<CommentPrimitives>;
  private readonly users: Collection<UserPrimitives>;
  public static async create(container: ResolutionContext) {
    const db = await container.getAsync(Db);
    return new MongoCommentReadModelRepository(db);
  }
  constructor(db: Db) {
    this.comments = db.collection(MongoCollections.COMMENTS);
    this.users = db.collection(MongoCollections.USERS);
  }

  async getAllByPostId(postId: PostId): Promise<CommentReadModel[]> {
    // Lookup para pillar los usuarios
    const comments = await this.comments
      .aggregate([
        { $match: { postId: postId.toPrimitives() } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "id",
            as: "user",
          },
        },
        { $unwind: "$user" },
      ])
      .toArray();

    return comments.map(mapDocumentToCommentReadModel);
  }

  async getOneById(
    commentId: CommentId,
  ): Promise<CommentReadModel | undefined> {
    const comment = await this.comments
      .aggregate([
        { $match: { id: commentId.toPrimitives() } },
        { $limit: 1 },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "id",
            as: "user",
          },
        },
        { $unwind: "$user" },
      ])
      .next();
    return comment ? mapDocumentToCommentReadModel(comment) : undefined;
  }
}
