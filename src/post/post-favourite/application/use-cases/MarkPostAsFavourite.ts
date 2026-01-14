import { CreatedAt } from "../../../../shared/domain/value-objects/CreatedAt.ts";
import { FavouriteId } from "../../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import type { UserRepository } from "../../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";
import type { PostRepository } from "../../../domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../domain/services/PostFinder.ts";
import { PostId } from "../../../domain/value-objects/PostId.ts";
import { PostFavouriteWithIdAlreadyExistsError } from "../../domain/errors/PostFavouriteWithIdAlreadyExistsError.ts";
import { UserAlreadyLikedPostError } from "../../domain/errors/UserAlreadyLikedPostError.ts";
import { PostFavourite } from "../../domain/PostFavourite.ts";
import type { PostFavouriteRepository } from "../../domain/repositories/PostFavouriteRepository.ts";

export class MarkPostAsFavourite {
  private readonly userFinder: UserFinder;
  private readonly postFinder: PostFinder;
  private postFavouriteRepository: PostFavouriteRepository;
  private userRepository: UserRepository;
  private postRepository: PostRepository;

  constructor(
    postFavouriteRepository: PostFavouriteRepository,
    userRepository: UserRepository,
    postRepository: PostRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
    this.postFinder = new PostFinder(postRepository);
    this.postFavouriteRepository = postFavouriteRepository;
    this.userRepository = userRepository;
    this.postRepository = postRepository;
  }

  async run(id: string, userId: string, createdAt: Date, postId: string) {
    const user = await this.userFinder.findById(new UserId(userId));
    const post = await this.postFinder.findById(new PostId(postId));

    // Ensure id is not used
    if (await this.postFavouriteRepository.existsWithId(new FavouriteId(id)))
      throw new PostFavouriteWithIdAlreadyExistsError(id);

    // Check user has not already liked the post
    if (
      await this.postFavouriteRepository.existsWithUserAndPostId(
        UserId.fromPrimitives(userId),
        PostId.fromPrimitives(postId)
      )
    )
      throw new UserAlreadyLikedPostError(userId, postId);

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
