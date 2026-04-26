import type { ResolutionContext } from "inversify";
import { Db, type Collection } from "mongodb";
import type { FavouriteId } from "../../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import { MongoCollections } from "../../../../shared/persistance/infrastructure/mongo/MongoCollections.ts";
import type { UserId } from "../../../../user/domain/value-objects/UserId.ts";
import type { PostId } from "../../../domain/value-objects/PostId.ts";
import {
  PostFavourite,
  type PostFavouritePrimitives,
} from "../../domain/PostFavourite.ts";
import type { PostFavouriteRepository } from "../../domain/repositories/PostFavouriteRepository.ts";

export class MongoPostFavouriteRepository implements PostFavouriteRepository {
  private readonly postFavourites: Collection<PostFavouritePrimitives>;
  public static async create(container: ResolutionContext) {
    const db = await container.getAsync(Db);
    return new MongoPostFavouriteRepository(db);
  }

  constructor(db: Db) {
    this.postFavourites = db.collection(MongoCollections.POSTS_FAVOURITES);
  }

  async create(favourite: PostFavourite): Promise<void> {
    const primitives = favourite.toPrimitives();
    await this.postFavourites.insertOne(primitives);
  }

  async getOneById(id: FavouriteId): Promise<PostFavourite | undefined> {
    const postFavourite = await this.postFavourites.findOne(
      { id: id.toPrimitives() },
      { projection: { _id: 0 } }, // Excludes the mongo id from the returned document
    );
    return postFavourite
      ? PostFavourite.fromPrimitives(postFavourite)
      : undefined;
  }

  async existsWithId(id: FavouriteId): Promise<boolean> {
    return (
      (await this.postFavourites.countDocuments(
        { id: id.toPrimitives() },
        { limit: 1 },
      )) > 0
    );
  }

  async existsWithUserAndPostId(
    userId: UserId,
    postId: PostId,
  ): Promise<boolean> {
    return (
      (await this.postFavourites.countDocuments(
        { userId: userId.toPrimitives(), postId: postId.toPrimitives() },
        { limit: 1 },
      )) > 0
    );
  }

  async getAllByPostId(postId: PostId): Promise<PostFavourite[]> {
    const postFavourites = await this.postFavourites
      .find({
        postId: postId.toPrimitives(),
      })
      .toArray();

    return postFavourites.map((postFavourite) =>
      PostFavourite.fromPrimitives(postFavourite),
    );
  }

  async getAllByUserId(userId: UserId): Promise<PostFavourite[]> {
    const postFavourites = await this.postFavourites
      .find({
        userId: userId.toPrimitives(),
      })
      .toArray();

    return postFavourites.map((postFavourite) =>
      PostFavourite.fromPrimitives(postFavourite),
    );
  }

  async deleteById(id: FavouriteId): Promise<void> {
    await this.postFavourites.deleteOne({ id: id.toPrimitives() });
  }

  async getByUserAndPostId(
    userId: UserId,
    postId: PostId,
  ): Promise<PostFavourite | undefined> {
    const postFavourite = await this.postFavourites.findOne(
      {
        userId: userId.toPrimitives(),
        postId: postId.toPrimitives(),
      },
      { projection: { _id: 0 } },
    );

    return postFavourite
      ? PostFavourite.fromPrimitives(postFavourite)
      : undefined;
  }
}
