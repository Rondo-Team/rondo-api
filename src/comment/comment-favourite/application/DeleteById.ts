import { FavouriteId } from "../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import type { CommentFavouriteRepository } from "../domain/repositories/CommentFavouriteRepository.ts";
import { CommentFavouriteFinder } from "../domain/services/CommentFavouriteFinder.ts";

export class DeleteById {
  private commentFavouriteRepository: CommentFavouriteRepository;
  private readonly commmentFavouriteFinder: CommentFavouriteFinder;
  constructor(commentFavouriteRepository: CommentFavouriteRepository) {
    this.commentFavouriteRepository = commentFavouriteRepository;
    this.commmentFavouriteFinder = new CommentFavouriteFinder(
      commentFavouriteRepository
    );
  }

  async run(id: string) {
    const favouriteId = new FavouriteId(id);
    await this.commmentFavouriteFinder.findById(favouriteId);
    return this.commentFavouriteRepository.deleteById(favouriteId);
  }
}
