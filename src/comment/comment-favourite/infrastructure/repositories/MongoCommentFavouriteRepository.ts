import type { ResolutionContext } from "inversify";
import { Db, type Collection } from "mongodb";
import type { PostId } from "../../../../post/domain/value-objects/PostId.ts";
import type { FavouriteId } from "../../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import { MongoCollections } from "../../../../shared/persistance/infrastructure/mongo/MongoCollections.ts";
import type { UserId } from "../../../../user/domain/value-objects/UserId.ts";
import type { CommentPrimitives } from "../../../domain/Comment.ts";
import type { CommentId } from "../../../domain/value-objects/CommentId.ts";
import {
  CommentFavourite,
  type CommentFavouritePrimitives,
} from "../../domain/CommentFavourite.ts";
import type { CommentFavouriteRepository } from "../../domain/repositories/CommentFavouriteRepository.ts";

export class MongoCommentFavouriteRepository implements CommentFavouriteRepository {
  private readonly commentFavourites: Collection<CommentFavouritePrimitives>;
  private readonly comments: Collection<CommentPrimitives>;
  public static async create(container: ResolutionContext) {
    const db = await container.getAsync(Db);
    return new MongoCommentFavouriteRepository(db);
  }

  constructor(db: Db) {
    this.commentFavourites = db.collection(MongoCollections.COMMENT_FAVOURITES);
    this.comments = db.collection(MongoCollections.COMMENTS);
  }

  async create(favourite: CommentFavourite): Promise<void> {
    const primitives = favourite.toPrimitives();
    await this.commentFavourites.insertOne(primitives);
  }

  async getOneById(id: FavouriteId): Promise<CommentFavourite | undefined> {
    const commentFavourite = await this.commentFavourites.findOne(
      { id: id.toPrimitives() },
      { projection: { _id: 0 } },
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
      CommentFavourite.fromPrimitives(commentFavourite),
    );
  }

  async existsWithId(id: UserId): Promise<boolean> {
    return (
      (await this.commentFavourites.countDocuments(
        { id: id.toPrimitives() },
        { limit: 1 },
      )) > 0
    );
  }

  async existsWithUserId(userId: UserId): Promise<boolean> {
    return (
      (await this.commentFavourites.countDocuments(
        { userId: userId.toPrimitives() },
        { limit: 1 },
      )) > 0
    );
  }

  async deleteById(id: FavouriteId): Promise<void> {
    await this.commentFavourites.deleteOne({ id: id.toPrimitives() });
  }

  async getAllByUserIdAndPostId(
    userId: UserId,
    postId: PostId,
  ): Promise<CommentFavourite[]> {
    const commentFavourites = await this.commentFavourites
      .aggregate<CommentFavouritePrimitives>([
        { $match: { userId: userId.toPrimitives() } },
        {
          $lookup: {
            from: MongoCollections.COMMENTS,
            localField: "commentId",
            foreignField: "id",
            as: "comment",
          },
        },
        { $unwind: "$comment" },
        { $match: { "comment.postId": postId.toPrimitives() } },
        {
          $project: {
            _id: 0,
            id: 1,
            userId: 1,
            commentId: 1,
            createdAt: 1,
          },
        },
      ])
      .toArray();

    return commentFavourites.map((commentFavourite) =>
      CommentFavourite.fromPrimitives(commentFavourite),
    );
  }
}
