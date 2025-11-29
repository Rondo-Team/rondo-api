import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserFinder } from "@/user/domain/services/UserFinder";
import { UserId } from "@/user/domain/value-objects/UserId";
import { PostFavouriteRepository } from "../../domain/repositories/PostFavouriteRepository";

export class GetAllByUserId {
  private readonly userFinder: UserFinder
  constructor(private postFavouriteRepository: PostFavouriteRepository, userRepository: UserRepository) {
    this.userFinder = new UserFinder(userRepository)
  }

  async run(id: string) {
    const userId = new UserId(id)
    await this.userFinder.findById(userId)
    this.postFavouriteRepository.getAllByUserId(userId)
  }
}