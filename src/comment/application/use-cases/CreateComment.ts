import { Comment } from "@/comment/domain/Comment";
import { CommentWithIdAlreadyExistsError } from "@/comment/domain/errors/CommentWithIdAlreadyExistsError";
import { CommentRepository } from "@/comment/domain/repositories/CommentRepository";
import { CommentFavouritesCount } from "@/comment/domain/value-objects/CommentFavouritesCount";
import { CommentId } from "@/comment/domain/value-objects/CommentId";
import { CommentMessage } from "@/comment/domain/value-objects/CommentMessage";
import { PostRepository } from "@/post/domain/repositories/PostRepository";
import { PostFinder } from "@/post/domain/services/PostFinder";
import { PostId } from "@/post/domain/value-objects/PostId";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserFinder } from "@/user/domain/services/UserFinder";
import { UserId } from "@/user/domain/value-objects/UserId";

export class CreateComment {
  private userFinder: UserFinder;
  private postFinder: PostFinder;
  constructor(
    private commentRepository: CommentRepository,
    private postRepository: PostRepository,
    private userRepository: UserRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
    this.postFinder = new PostFinder(postRepository);
  }

  async run(
    id: string,
    userId: string,
    postId: string,
    message: string,
    favouritesCount: number,
    createdAt: Date,
  ) {
    const comment = new Comment(
      new CommentId(id),
      new UserId(userId),
      new PostId(postId),
      new CommentMessage(message),
      new CommentFavouritesCount(favouritesCount),
      new CreatedAt(createdAt)
    );

    // Ensure user exists
    const user = await this.userFinder.findById(new UserId(userId));
    // Ensure post exists
    const post = await this.postFinder.findById(new PostId(postId));
    // Ensure comment with id do not exist already
    if (await this.commentRepository.existsWithId(new CommentId(id)))
      throw new CommentWithIdAlreadyExistsError(id);
    // Trigger a post CommentCount update and a user commentsCount update.
    user.addComment();
    post.addComment();
    await this.userRepository.edit(user);
    await this.postRepository.edit(post);
    // Create Comment
    return this.commentRepository.create(comment);
  }
}
