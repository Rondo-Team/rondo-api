import { FavouriteId } from "@/shared/favourite/domain/value-objects/FavouriteId"
import { PostFavouriteRepository } from "../../domain/repositories/PostFavouriteRepository"
import { PostFavouriteFinder } from "../../domain/services/PostFavouriteFinder"

export class DeleteById {
  private readonly postFavouriteFinder: PostFavouriteFinder
  constructor(
    private postFavouriteRepository: PostFavouriteRepository,
  ) {
    this.postFavouriteFinder = new PostFavouriteFinder(postFavouriteRepository)
  }

  async run(
    id: string,
  ) {
    const postFavourite = await this.postFavouriteFinder.findById(new FavouriteId(id))
    return this.postFavouriteRepository.deleteById(postFavourite.id)
  }
}