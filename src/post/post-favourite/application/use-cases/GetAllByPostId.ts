import { PostRepository } from "../../../domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../domain/services/PostFinder.ts";
import { PostId } from "../../../domain/value-objects/PostId.ts";
import { PostFavouriteRepository } from "../../domain/repositories/PostFavouriteRepository.ts";

export class GetAllByPostId {
  private readonly postFinder: PostFinder;
  constructor(
    private postFavouriteRepository: PostFavouriteRepository,
    postRepository: PostRepository
  ) {
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string) {
    const postId = new PostId(id);
    await this.postFinder.findById(postId);
    this.postFavouriteRepository.getAllByPostId(postId);
  }
}
