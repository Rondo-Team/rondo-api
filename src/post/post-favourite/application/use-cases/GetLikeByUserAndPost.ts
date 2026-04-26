import type { UserRepository } from "../../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";
import type { PostRepository } from "../../../domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../domain/services/PostFinder.ts";
import { PostId } from "../../../domain/value-objects/PostId.ts";
import { LikeWithUserAndPostNotFoundError } from "../../domain/errors/LikeWithUserAndPostNotFoundError.ts";
import type { PostFavouriteRepository } from "../../domain/repositories/PostFavouriteRepository.ts";

export class GetLikeByUserAndPost {
  private readonly userFinder: UserFinder;
  private readonly postFinder: PostFinder;
  private postFavouriteRepository: PostFavouriteRepository;
  constructor(
    postFavouriteRepository: PostFavouriteRepository,
    userRepository: UserRepository,
    postRepository: PostRepository,
  ) {
    this.userFinder = new UserFinder(userRepository);
    this.postFinder = new PostFinder(postRepository);
    this.postFavouriteRepository = postFavouriteRepository;
  }

  async run(postId: string, userId: string) {
    const postIdDomainEntity = PostId.fromPrimitives(postId);
    const userIdDomainEntity = UserId.fromPrimitives(userId);

    await this.postFinder.findById(postIdDomainEntity);
    await this.userFinder.findById(userIdDomainEntity);

    const favourite = await this.postFavouriteRepository.getByUserAndPostId(
      userIdDomainEntity,
      postIdDomainEntity,
    );

    if (!favourite) throw new LikeWithUserAndPostNotFoundError(userId, postId);

    return favourite;
  }
}
