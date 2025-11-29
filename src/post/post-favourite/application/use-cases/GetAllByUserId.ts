import { PostId } from "@/post/domain/value-objects/PostId";
import { PostFavouriteRepository } from "../../domain/repositories/PostFavouriteRepository";
import { UserId } from "@/user/domain/value-objects/UserId";

export class GetAllByUserId {
  constructor(private postFavouriteRepository: PostFavouriteRepository) { }

  async run(userId: UserId) {
    this.postFavouriteRepository.getAllByUserId(userId)
  }
}