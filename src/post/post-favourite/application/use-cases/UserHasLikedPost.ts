import { ResourceAccessChecker } from "../../../../shared/domain/services/ResourceAccessChecker.ts";
import type { UserRepository } from "../../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";
import type { PostRepository } from "../../../domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../domain/services/PostFinder.ts";
import { PostId } from "../../../domain/value-objects/PostId.ts";
import type { PostFavouriteRepository } from "../../domain/repositories/PostFavouriteRepository.ts";

export class UserHasLikedPost {
  private readonly userFinder: UserFinder;
  private readonly postFinder: PostFinder;
  private postFavouriteRepository: PostFavouriteRepository;
  private resourceAccessChecker: ResourceAccessChecker;
  constructor(
    postFavouriteRepository: PostFavouriteRepository,
    userRepository: UserRepository,
    postRepository: PostRepository,
  ) {
    this.userFinder = new UserFinder(userRepository);
    this.postFinder = new PostFinder(postRepository);
    this.postFavouriteRepository = postFavouriteRepository;
    this.resourceAccessChecker = new ResourceAccessChecker();
  }

  async run(postId: string, userId: string, actorId: string) {
    const postIdDomainEntity = PostId.fromPrimitives(postId);
    const userIdDomainEntity = UserId.fromPrimitives(userId);
    const actorIdDomainEntity = UserId.fromPrimitives(actorId);

    await this.postFinder.findById(postIdDomainEntity);
    await this.userFinder.findById(userIdDomainEntity);

    await this.resourceAccessChecker.check(
      actorIdDomainEntity,
      userIdDomainEntity,
    );

    return this.postFavouriteRepository.existsWithUserAndPostId(
      userIdDomainEntity,
      postIdDomainEntity,
    );
  }
}
