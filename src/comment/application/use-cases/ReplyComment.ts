import type { PostRepository } from "../../../post/domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../post/domain/services/PostFinder.ts";
import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import type { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { Comment } from "../../domain/Comment.ts";
import { CommentNotFoundByIdError } from "../../domain/errors/CommentNotFoundByIdError.ts";
import { CommentReplyRefersToDifferentPostError } from "../../domain/errors/CommentReplyRefersToDifferentPostError.ts";
import { CommentWithIdAlreadyExistsError } from "../../domain/errors/CommentWithIdAlreadyExistsError.ts";
import type { CommentRepository } from "../../domain/repositories/CommentRepository.ts";
import { CommentFinder } from "../../domain/services/CommentFinder.ts";
import { CommentFavouritesCount } from "../../domain/value-objects/CommentFavouritesCount.ts";
import { CommentId } from "../../domain/value-objects/CommentId.ts";
import { CommentMessage } from "../../domain/value-objects/CommentMessage.ts";

export class ReplyComment {
  private commentRepository: CommentRepository;
  private postRepository: PostRepository;
  private userRepository: UserRepository;
  private userFinder: UserFinder;
  private postFinder: PostFinder;
  private commentFinder: CommentFinder;
  constructor(
    commentRepository: CommentRepository,
    postRepository: PostRepository,
    userRepository: UserRepository
  ) {
    this.commentRepository = commentRepository;
    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.userFinder = new UserFinder(userRepository);
    this.postFinder = new PostFinder(postRepository);
    this.commentFinder = new CommentFinder(commentRepository);
  }

  async run(
    id: string,
    userId: string,
    postId: string,
    message: string,
    favouritesCount: number,
    createdAt: Date,
    parentId: string
  ) {
    const comment = new Comment(
      new CommentId(id),
      new UserId(userId),
      new PostId(postId),
      new CommentMessage(message),
      new CommentFavouritesCount(favouritesCount),
      new CreatedAt(createdAt),
      new CommentId(parentId)
    );

    // Ensure user exists
    const user = await this.userFinder.findById(new UserId(userId));
    // Ensure post exists
    const post = await this.postFinder.findById(new PostId(postId));
    // Ensure comment with id do not exist already
    if (await this.commentRepository.existsWithId(new CommentId(id)))
      throw new CommentWithIdAlreadyExistsError(id);
    // Ensure comment with parentId id exists
    if (!(await this.commentRepository.existsWithId(new CommentId(parentId))))
      throw new CommentNotFoundByIdError(id);
    // Ensure parentId is referring to a comment in the same post
    const parentComment = await this.commentFinder.findById(
      CommentId.fromPrimitives(parentId)
    );
    if (parentComment.postId.toPrimitives() !== postId)
      throw new CommentReplyRefersToDifferentPostError(id, postId);

    // Trigger a post CommentCount update and a user commentsCount update.
    user.addComment();
    post.addComment();
    await this.userRepository.edit(user);
    await this.postRepository.edit(post);
    // Create Comment
    return this.commentRepository.create(comment);
  }
}
