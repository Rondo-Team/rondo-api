import type { ResolutionContext } from "inversify";
import { Collection, Db } from "mongodb";
import type { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { MongoCollections } from "../../../shared/persistance/infrastructure/mongo/MongoCollections.ts";
import { Comment, type CommentPrimitives } from "../../domain/Comment.ts";
import type { CommentRepository } from "../../domain/repositories/CommentRepository.ts";
import type { CommentId } from "../../domain/value-objects/CommentId.ts";

export class MongoCommentRepository implements CommentRepository {
  private readonly comments: Collection<CommentPrimitives>;
  public static async create(container: ResolutionContext) {
    const db = await container.getAsync(Db);
    return new MongoCommentRepository(db);
  }
  constructor(db: Db) {
    this.comments = db.collection(MongoCollections.COMMENTS);
  }

  async create(comment: Comment): Promise<void> {
    const primitives = comment.toPrimitives();
    await this.comments.insertOne(primitives);
  }

  async deleteById(id: CommentId): Promise<void> {
    await this.comments.deleteOne({
      id: id.toPrimitives(),
    });
  }

  async edit(comment: Comment): Promise<void> {
    const primitives = comment.toPrimitives();
    await this.comments.findOneAndUpdate(
      { id: primitives.id },
      { $set: primitives }
    );
  }

  async existsWithId(commentId: CommentId): Promise<boolean> {
    return (
      (await this.comments.countDocuments(
        { id: commentId.toPrimitives() },
        { limit: 1 }
      )) > 0
    );
  }

  async getAllByPostId(postId: PostId): Promise<Comment[]> {
    const comments = await this.comments
      .find({
        postId: postId.toPrimitives(),
      })
      .toArray();
    return comments.map((comment) => Comment.fromPrimitives(comment));
  }

  async getOneById(commentId: CommentId): Promise<Comment | undefined> {
    const comment = await this.comments.findOne(
      { id: commentId.toPrimitives() },
      { projection: { _id: 0 } }
    );

    return comment ? Comment.fromPrimitives(comment) : undefined;
  }

  async detachChildrenFromParent(parentId: CommentId): Promise<void> {
    await this.comments.updateMany(
      { parentId: parentId.toPrimitives() },
      { $set: { parentId: null } }
    );
  }
}
