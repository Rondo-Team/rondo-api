import { FavouriteId } from "../../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import { PostFavouriteRepository } from "../../domain/repositories/PostFavouriteRepository.ts";
import { PostFavouriteFinder } from "../../domain/services/PostFavouriteFinder.ts";

export class DeleteById {
  private readonly postFavouriteFinder: PostFavouriteFinder;
  constructor(private postFavouriteRepository: PostFavouriteRepository) {
    this.postFavouriteFinder = new PostFavouriteFinder(postFavouriteRepository);
  }

  async run(id: string) {
    const favouriteId = new FavouriteId(id);
    await this.postFavouriteFinder.findById(favouriteId);
    return this.postFavouriteRepository.deleteById(favouriteId);
  }
}
