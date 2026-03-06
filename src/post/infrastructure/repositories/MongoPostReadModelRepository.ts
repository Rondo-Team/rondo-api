import type { ResolutionContext } from "inversify";
import { Db, type Collection } from "mongodb";
import { MongoCollections } from "../../../shared/persistance/infrastructure/mongo/MongoCollections.ts";
import type { UserPrimitives } from "../../../user/domain/User.ts";
import type { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { type PostPrimitives } from "../../domain/Post.ts";
import type { PostDetailReadModel } from "../../domain/read-models/PostDetailReadModel.ts";
import type { PostReadModelRepository } from "../../domain/repositories/PostReadModelRepository.ts";
import type { PostCriteriaOptions } from "../../domain/value-objects/PostCriteriaOptions.ts";
import type { PostId } from "../../domain/value-objects/PostId.ts";
import { createMongoPostQuery } from "../utils/CreateMongoPostQuery.ts";
import { mapDocumentToPostReadModel } from "../utils/MapDocumentToPostReadModel.ts";

export class MongoPostReadModelRepository implements PostReadModelRepository {
  private readonly posts: Collection<PostPrimitives>;
  private readonly users: Collection<UserPrimitives>;
  public static async create(container: ResolutionContext) {
    const db = await container.getAsync(Db);
    return new MongoPostReadModelRepository(db);
  }

  constructor(db: Db) {
    this.posts = db.collection(MongoCollections.POSTS);
    this.users = db.collection(MongoCollections.USERS);
  }

  async getOneById(id: PostId): Promise<PostDetailReadModel | undefined> {
    const post = await this.posts
      .aggregate([
        { $match: { id: id.toPrimitives() } },
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
        { $project: { _id: 0, "user.id": 0 } },
      ])
      .toArray()[0];

    return post ? mapDocumentToPostReadModel(post) : undefined;
  }

  async getAll(): Promise<PostDetailReadModel[]> {
    const result = await this.posts
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        { $project: { _id: 0, "user.id": 0 } },
      ])
      .toArray();

    return result.map((post) => mapDocumentToPostReadModel(post));
  }

  async getAllByUserId(userId: UserId): Promise<PostDetailReadModel[]> {
    const posts = await this.posts
      .aggregate([
        { $match: { userId: userId.toPrimitives() } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        { $project: { _id: 0, "user.id": 0 } },
      ])
      .toArray();
    return posts.map((post) => mapDocumentToPostReadModel(post));
  }

  async getByCriteria(
    criteria: PostCriteriaOptions,
  ): Promise<PostDetailReadModel[]> {
    // Create indexes in order to use $text searching
    await this.posts.createIndex({
      title: "text",
      description: "text",
    });
    // Find by query if existing and filter by filters
    const { query, filters } = criteria.toPrimitives();
    const mongoQuery = createMongoPostQuery(query, filters);

    const posts = await this.posts
      .aggregate([
        { $match: mongoQuery },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        { $project: { _id: 0, "user.id": 0 } },
      ])
      .toArray();

    return posts.map((post) => mapDocumentToPostReadModel(post));
  }
}
