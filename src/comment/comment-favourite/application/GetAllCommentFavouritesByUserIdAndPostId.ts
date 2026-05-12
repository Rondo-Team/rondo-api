import type { PostRepository } from "../../../post/domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../post/domain/services/PostFinder.ts";
import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import type { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { CommentFavouriteRepository } from "../domain/repositories/CommentFavouriteRepository.ts";

export class GetAllCommentFavouritesByUserIdAndPostId {
  private commentFavouriteRepository: CommentFavouriteRepository;
  private userFinder: UserFinder;
  private postFinder: PostFinder;
  constructor(
    commentFavouriteRepository: CommentFavouriteRepository,
    userRepository: UserRepository,
    postRepository: PostRepository,
  ) {
    this.commentFavouriteRepository = commentFavouriteRepository;
    this.userFinder = new UserFinder(userRepository);
    this.postFinder = new PostFinder(postRepository);
  }

  async run(userId: string, postId: string) {
    const userIdDomainEntity = UserId.fromPrimitives(userId);
    const postIdDomainEntity = PostId.fromPrimitives(postId);
    await this.userFinder.findById(userIdDomainEntity);
    await this.postFinder.findById(postIdDomainEntity);

    return this.commentFavouriteRepository.getAllByUserIdAndPostId(
      userIdDomainEntity,
      postIdDomainEntity,
    );
  }
}
