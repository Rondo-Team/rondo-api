import { FavouriteId } from "@/shared/favourite/domain/value-objects/FavouriteId"
import { CommentFavouriteRepository } from "../domain/repositories/CommentFavouriteRepository"
import { CommentFavouriteFinder } from "../domain/services/CommentFavouriteFinder"

export class DeleteById {
  private readonly commmentFavouriteFinder: CommentFavouriteFinder
  constructor(
    private commentFavouriteRepository: CommentFavouriteRepository,
  ) {
    this.commmentFavouriteFinder = new CommentFavouriteFinder(commentFavouriteRepository)
  }

  async run(id: string) {
    const favouriteId = new FavouriteId(id)
    await this.commmentFavouriteFinder.findById(favouriteId)
    return this.commentFavouriteRepository.deleteById(favouriteId)
  }
}