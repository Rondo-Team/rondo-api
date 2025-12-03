import { Comment } from "@/comment/domain/Comment";
import { CommentRepository } from "@/comment/domain/repositories/CommentRepository";
import { CommentId } from "@/comment/domain/value-objects/CommentId";
import { PostId } from "@/post/domain/value-objects/PostId";
import { ResolutionContext } from "inversify";
import { Collection, Db } from "mongodb";

export class MongoCommentRepository implements CommentRepository {
  private readonly comments: Collection<Comment>;
  public static async create(container: ResolutionContext) {
    const db = await container.getAsync(Db)
    return new MongoCommentRepository(db)
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
