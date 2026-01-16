import type { ResolutionContext } from "inversify";
import { Db, type Collection } from "mongodb";
import type { FavouriteId } from "../../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import { MongoCollections } from "../../../../shared/persistance/infrastructure/mongo/MongoCollections.ts";
import type { UserId } from "../../../../user/domain/value-objects/UserId.ts";
import type { CommentId } from "../../../domain/value-objects/CommentId.ts";
import {
  CommentFavourite,
  type CommentFavouritePrimitives,
} from "../../domain/CommentFavourite.ts";
import type { CommentFavouriteRepository } from "../../domain/repositories/CommentFavouriteRepository.ts";

export class MongoCommentFavouriteRepository
  implements CommentFavouriteRepository
{
  private readonly commentFavourites: Collection<CommentFavouritePrimitives>;
  public static async create(container: ResolutionContext) {
    const db = await container.getAsync(Db);
    return new MongoCommentFavouriteRepository(db);
  }

  constructor(db: Db) {
    this.commentFavourites = db.collection(MongoCollections.COMMENT_FAVOURITES);
  }

  async create(favourite: CommentFavourite): Promise<void> {
    const primitives = favourite.toPrimitives();
    await this.commentFavourites.insertOne(primitives);
  }

  async getOneById(id: FavouriteId): Promise<CommentFavourite | undefined> {
    const commentFavourite = await this.commentFavourites.findOne(
      { id: id.toPrimitives() },
      { projection: { _id: 0 } }
    );

    return commentFavourite
      ? CommentFavourite.fromPrimitives(commentFavourite)
      : undefined;
  }

  async getAllByCommentId(commentId: CommentId): Promise<CommentFavourite[]> {
    const commentFavourites = await this.commentFavourites
      .find({
        commentId: commentId.toPrimitives(),
      })
      .toArray();

    return commentFavourites.map((commentFavourite) =>
      CommentFavourite.fromPrimitives(commentFavourite)
    );
  }

  async existsWithId(id: UserId): Promise<boolean> {
    return (
      (await this.commentFavourites.countDocuments(
        { id: id.toPrimitives() },
        { limit: 1 }
      )) > 0
    );
  }

  async existsWithUserId(userId: UserId): Promise<boolean> {
    return (
      (await this.commentFavourites.countDocuments(
        { userId: userId.toPrimitives() },
        { limit: 1 }
      )) > 0
    );
  }

  async deleteById(id: FavouriteId): Promise<void> {
    await this.commentFavourites.deleteOne({ id: id.toPrimitives() });
  }
}
