import type { PostRepository } from "../../../domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../domain/services/PostFinder.ts";
import { PostId } from "../../../domain/value-objects/PostId.ts";
import type { PostFavouriteRepository } from "../../domain/repositories/PostFavouriteRepository.ts";

export class GetAllPostFavouritesByPostId {
  private readonly postFinder: PostFinder;
  private postFavouriteRepository: PostFavouriteRepository;
  constructor(
    postFavouriteRepository: PostFavouriteRepository,
    postRepository: PostRepository
  ) {
    this.postFinder = new PostFinder(postRepository);
    this.postFavouriteRepository = postFavouriteRepository;
  }

  async run(postId: string) {
    await this.postFinder.findById(PostId.fromPrimitives(postId));
    return this.postFavouriteRepository.getAllByPostId(
      PostId.fromPrimitives(postId)
    );
  }
}
