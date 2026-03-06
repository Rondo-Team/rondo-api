import type { ResolutionContext } from "inversify";
import { Db, type Collection } from "mongodb";
import { MongoCollections } from "../../../shared/persistance/infrastructure/mongo/MongoCollections.ts";
import type { UserPrimitives } from "../../../user/domain/User.ts";
import { type PostPrimitives } from "../../domain/Post.ts";
import type { PostDetailReadModel } from "../../domain/read-models/PostDetailReadModel.ts";
import type { PostReadModelRepository } from "../../domain/repositories/PostReadModelRepository.ts";
import type { PostId } from "../../domain/value-objects/PostId.ts";

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
    const result = await this.posts
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
      .toArray();
    const post = result[0];

    return post
      ? {
          id: post.id,
          title: post.title,
          description: post.description,
          favoritesCount: post.favoritesCount,
          commentsCount: post.commentsCount,
          proposalsCount: post.proposalsCount,
          createdAt: post.createdAt,
          tags: post.tags,
          play: post.play,
          user: {
            username: post.user.username,
            profilePicture: post.user.profilePicture,
          },
        }
      : undefined;
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

    const posts = result.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      favoritesCount: post.favoritesCount,
      commentsCount: post.commentsCount,
      proposalsCount: post.proposalsCount,
      createdAt: post.createdAt,
      tags: post.tags,
      play: post.play,
      user: {
        username: post.user.username,
        profilePicture: post.user.profilePicture,
      },
    }));

    return posts;
  }
}
