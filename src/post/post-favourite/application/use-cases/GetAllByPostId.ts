import { PostRepository } from "@/post/domain/repositories/PostRepository";
import { PostFinder } from "@/post/domain/services/PostFinder";
import { PostId } from "@/post/domain/value-objects/PostId";
import { PostFavouriteRepository } from "../../domain/repositories/PostFavouriteRepository";

export class GetAllByPostId {
  private readonly postFinder: PostFinder
  constructor(private postFavouriteRepository: PostFavouriteRepository, postRepository: PostRepository) {
    this.postFinder = new PostFinder(postRepository)
  }

  async run(id: string) {
    const postId = new PostId(id)
    await this.postFinder.findById(postId)
    this.postFavouriteRepository.getAllByPostId(postId)
  }
}