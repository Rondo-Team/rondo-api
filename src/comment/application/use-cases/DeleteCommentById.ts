import type { PostRepository } from "../../../post/domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../post/domain/services/PostFinder.ts";
import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import type { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { CommentRepository } from "../../domain/repositories/CommentRepository.ts";
import { CommentFinder } from "../../domain/services/CommentFinder.ts";
import { CommentId } from "../../domain/value-objects/CommentId.ts";

export class DeleteCommentById {
  private commentRepository: CommentRepository;
  private commentFinder: CommentFinder;
  private userFinder: UserFinder;
  private postFinder: PostFinder;
  private userRepository: UserRepository;
  private postRepository: PostRepository;
  private resourceAccessChecker: ResourceAccessChecker;
  constructor(
    commentRepository: CommentRepository,
    userRepository: UserRepository,
    postRepository: PostRepository
  ) {
    this.commentRepository = commentRepository;
    this.commentFinder = new CommentFinder(commentRepository);
    this.userFinder = new UserFinder(userRepository);
    this.postFinder = new PostFinder(postRepository);
    this.userRepository = userRepository;
    this.postRepository = postRepository;
    this.resourceAccessChecker = new ResourceAccessChecker();
  }

  async run(id: string, actorId: string) {
    const commentId = new CommentId(id);
    // Check comment existance
    const comment = await this.commentFinder.findById(commentId);

    // Check permissions
    await this.resourceAccessChecker.check(
      UserId.fromPrimitives(actorId),
      comment.userId
    );

    const user = await this.userFinder.findById(comment.userId);
    const post = await this.postFinder.findById(comment.postId);

    // Trigger user and post updates
    user.deleteComment();
    post.deleteComment();
    await this.userRepository.edit(user);
    await this.postRepository.edit(post);
    // Detach children comments from parent
    await this.commentRepository.detachChildrenFromParent(commentId);

    return this.commentRepository.deleteById(commentId);
  }
}
