import { CreatedAt } from "../../../../shared/domain/value-objects/CreatedAt.ts";
import { FavouriteId } from "../../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import { UserRepository } from "../../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";
import { PostRepository } from "../../../domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../domain/services/PostFinder.ts";
import { PostId } from "../../../domain/value-objects/PostId.ts";
import { PostFavourite } from "../../domain/PostFavourite.ts";
import { PostFavouriteRepository } from "../../domain/repositories/PostFavouriteRepository.ts";

export class CreatePostFavourite {
  private readonly userFinder: UserFinder;
  private readonly postFinder: PostFinder;
  constructor(
    private postFavouriteRepository: PostFavouriteRepository,
    private userRepository: UserRepository,
    private postRepository: PostRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string, userId: string, createdAt: Date, postId: string) {
    const user = await this.userFinder.findById(new UserId(userId));
    const post = await this.postFinder.findById(new PostId(postId));

    const postFavourite = new PostFavourite(
      new FavouriteId(id),
      new UserId(userId),
      new CreatedAt(createdAt),
      new PostId(postId)
    );

    // Triggers user and post updates
    user.addFavourite();
    await this.userRepository.edit(user);

    post.addFavourite();
    await this.postRepository.edit(post);

    return this.postFavouriteRepository.create(postFavourite);
  }
}
