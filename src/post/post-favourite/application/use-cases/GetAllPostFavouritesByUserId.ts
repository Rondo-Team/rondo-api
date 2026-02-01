import { ResourceAccessChecker } from "../../../../shared/domain/services/ResourceAccessChecker.ts";
import type { UserRepository } from "../../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";
import type { PostFavouriteRepository } from "../../domain/repositories/PostFavouriteRepository.ts";

export class GetAllPostFavouritesByUserId {
  private readonly userFinder: UserFinder;
  private postFavouriteRepository: PostFavouriteRepository;
  private resourceAccessChecker: ResourceAccessChecker;
  constructor(
    postFavouriteRepository: PostFavouriteRepository,
    userRepository: UserRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
    this.postFavouriteRepository = postFavouriteRepository;
    this.resourceAccessChecker = new ResourceAccessChecker();
  }

  async run(userId: string, actorId: string) {
    await this.userFinder.findById(UserId.fromPrimitives(userId));
    // User can only list all of its own likes
    await this.resourceAccessChecker.check(
      UserId.fromPrimitives(actorId),
      UserId.fromPrimitives(userId)
    );

    return this.postFavouriteRepository.getAllByUserId(
      UserId.fromPrimitives(userId)
    );
  }
}
