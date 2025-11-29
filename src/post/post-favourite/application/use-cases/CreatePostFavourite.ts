import { PostRepository } from "@/post/domain/repositories/PostRepository";
import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserFinder } from "@/user/domain/services/UserFinder";
import { PostFavouriteRepository } from "../../domain/repositories/PostFavouriteRepository";
import { UserId } from "@/user/domain/value-objects/UserId";
import { PostFinder } from "@/post/domain/services/PostFinder";
import { PostId } from "@/post/domain/value-objects/PostId";
import { PostFavourite } from "../../domain/PostFavourite";
import { FavouriteId } from "@/shared/favourite/domain/value-objects/FavouriteId";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";


export class CreatePostFavourite {
  private readonly userFinder: UserFinder
  private readonly postFinder: PostFinder
  constructor(
    private postFavouriteRepository: PostFavouriteRepository,
    private userRepository: UserRepository,
    private postRepository: PostRepository
  ) {
    this.userFinder = new UserFinder(userRepository)
    this.postFinder = new PostFinder(postRepository)
  }

  async run(
    id: string,
    userId: string,
    createdAt: Date,
    postId: string
  ) {
    const user = await this.userFinder.findById(new UserId(userId))
    const post = await this.postFinder.findById(new PostId(postId))

    const postFavourite = new PostFavourite(
      new FavouriteId(id),
      new UserId(userId),
      new CreatedAt(createdAt),
      new PostId(postId)
    )

    // Triggers user and post updates
    user.addFavourite()
    await this.userRepository.edit(user)

    post.addFavourite()
    await this.postRepository.edit(post)

    return this.postFavouriteRepository.create(postFavourite)
  }
}