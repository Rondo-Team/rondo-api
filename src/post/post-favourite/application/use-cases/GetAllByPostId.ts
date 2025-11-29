import { PostId } from "@/post/domain/value-objects/PostId";
import { PostFavouriteRepository } from "../../domain/repositories/PostFavouriteRepository";

export class GetAllByPostId {
  constructor(private postFavouriteRepository: PostFavouriteRepository) { }

  async run(postId: PostId) {
    this.postFavouriteRepository.getAllByPostId(postId)
  }
}