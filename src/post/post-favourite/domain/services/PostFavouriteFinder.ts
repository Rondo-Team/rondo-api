import { FavouriteId } from "../../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import { PostFavouriteNotFoundByIdError } from "../errors/PostFavouriteNotFoundByIdError.ts";
import { type PostFavouriteRepository } from "../repositories/PostFavouriteRepository.ts";

export class PostFavouriteFinder {
  private postFavouriteRepository: PostFavouriteRepository;
  constructor(postFavouriteRepository: PostFavouriteRepository) {
    this.postFavouriteRepository = postFavouriteRepository;
  }

  async findById(id: FavouriteId) {
    const postFavourite = await this.postFavouriteRepository.getOneById(id);
    if (!postFavourite)
      throw new PostFavouriteNotFoundByIdError(id.toPrimitives());
    return postFavourite;
  }
}
