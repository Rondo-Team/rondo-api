import type { ResolutionContext } from "inversify";
import { Db, type Collection } from "mongodb";
import { MongoCollections } from "../../../shared/persistance/infrastructure/mongo/MongoCollections.ts";
import type { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { Post, type PostPrimitives } from "../../domain/Post.ts";
import type { PostRepository } from "../../domain/repositories/PostRepository.ts";
import type { PostCriteriaOptions } from "../../domain/value-objects/PostCriteriaOptions.ts";
import type { PostId } from "../../domain/value-objects/PostId.ts";
import { createMongoPostQuery } from "../utils/CreateMongoPostQuery.ts";

export class MongoPostRepository implements PostRepository {
  private readonly posts: Collection<PostPrimitives>;
  public static async create(container: ResolutionContext) {
    const db = await container.getAsync(Db);
    return new MongoPostRepository(db);
  }

  constructor(db: Db) {
    this.posts = db.collection(MongoCollections.POSTS);
  }

  async create(post: Post): Promise<void> {
    const primitives = post.toPrimitives();
    await this.posts.insertOne(primitives);
  }

  async getOneById(id: PostId): Promise<Post | undefined> {
    const post = await this.posts.findOne(
      { id: id.toPrimitives() },
      { projection: { _id: 0 } } // Excludes the mongo id from the returned document
    );
    return post ? Post.fromPrimitives(post) : undefined;
  }

  async getAll(): Promise<Post[]> {
    const posts = await this.posts.find({}).toArray();
    return posts.map((post) => Post.fromPrimitives(post));
  }

  async getAllByUserId(userId: UserId): Promise<Post[]> {
    const posts = await this.posts
      .find({
        userId: userId.toPrimitives(),
      })
      .toArray();
    return posts.map((post) => Post.fromPrimitives(post));
  }

  async existsWithId(postId: PostId): Promise<boolean> {
    return (
      (await this.posts.countDocuments(
        { id: postId.toPrimitives() },
        { limit: 1 }
      )) > 0
    );
  }

  async edit(post: Post): Promise<void> {
    const primitives = post.toPrimitives();
    await this.posts.updateOne(
      { id: post.id.toPrimitives() },
      { $set: primitives } // In order to not delete the whole document
    );
  }

  async deleteById(id: PostId): Promise<void> {
    await this.posts.deleteOne({ id: id.toPrimitives() });
  }

  async getByCriteria(criteria: PostCriteriaOptions): Promise<Post[]> {
    // Create indexes in order to use $text searching
    this.posts.createIndex({
      title: "text",
      description: "text"
    })
    // Find by query if existing and filter by filters
    const { query, filters } = criteria.toPrimitives();
    const mongoQuery = createMongoPostQuery(query, filters);

    const posts = await this.posts.find(mongoQuery).toArray();

    return posts.map((post) => Post.fromPrimitives(post));
  }
}
