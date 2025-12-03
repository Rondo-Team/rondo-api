import { ResolutionContext } from "inversify";
import { Collection, Db } from "mongodb";
import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { Comment } from "../../domain/Comment.ts";
import { CommentRepository } from "../../domain/repositories/CommentRepository.ts";
import { CommentId } from "../../domain/value-objects/CommentId.ts";

export class MongoCommentRepository implements CommentRepository {
  private readonly comments: Collection<Comment>;
  public static async create(container: ResolutionContext) {
    const db = await container.getAsync(Db);
    return new MongoCommentRepository(db);
  }
  constructor(db: Db) {
    this.comments = db.collection("comments");
  }

  create(comment: Comment): Promise<void> {
    //TODO
  }

  deleteById(id: CommentId): Promise<void> {
    //TODO
  }

  edit(comment: Comment): Promise<void> {
    //TODO
  }

  existsWithId(commentId: CommentId): Promise<boolean> {
    //TODO
  }

  getAllByPostId(postId: PostId): Promise<Comment[] | undefined> {
    //TODO
  }

  getOneById(commentId: CommentId): Promise<Comment | undefined> {
    //TODO
  }
}
