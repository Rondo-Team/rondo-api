import { ResourceAccessChecker } from "../../../../shared/domain/services/ResourceAccessChecker.ts";
import { FavouriteId } from "../../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import type { UserRepository } from "../../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";
import type { PostRepository } from "../../../domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../domain/services/PostFinder.ts";
import type { PostFavouriteRepository } from "../../domain/repositories/PostFavouriteRepository.ts";
import { PostFavouriteFinder } from "../../domain/services/PostFavouriteFinder.ts";

export class UnmarkPostAsFavourite {
  private readonly postFavouriteFinder: PostFavouriteFinder;
  private readonly userFinder: UserFinder;
  private readonly postFinder: PostFinder;
  private postFavouriteRepository: PostFavouriteRepository;
  private resourceAccessChecker: ResourceAccessChecker;
  private userRepository: UserRepository;
  private postRepository: PostRepository;
  constructor(
    postFavouriteRepository: PostFavouriteRepository,
    userRepository: UserRepository,
    postRepository: PostRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
    this.postFinder = new PostFinder(postRepository);
    this.postFavouriteFinder = new PostFavouriteFinder(postFavouriteRepository);
    this.postFavouriteRepository = postFavouriteRepository;
    this.resourceAccessChecker = new ResourceAccessChecker();
    this.userRepository = userRepository;
    this.postRepository = postRepository;
  }

  async run(id: string, actorId: string) {
    const favouriteId = FavouriteId.fromPrimitives(id);
    const postFavourite = await this.postFavouriteFinder.findById(favouriteId);
    const post = await this.postFinder.findById(postFavourite.postId);
    const user = await this.userFinder.findById(UserId.fromPrimitives(actorId));

    await this.resourceAccessChecker.check(
      UserId.fromPrimitives(actorId),
      postFavourite.userId
    );

    // Triggers user and post updates
    user.deleteFavourite();
    await this.userRepository.edit(user);

    post.deleteFavourite();
    await this.postRepository.edit(post);

    return this.postFavouriteRepository.deleteById(favouriteId);
  }
}
