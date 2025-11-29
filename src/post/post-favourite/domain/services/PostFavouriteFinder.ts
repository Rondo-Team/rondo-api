import { PostId } from "@/post/domain/value-objects/PostId";
import { PostFavouriteNotFoundByIdError } from "../errors/PostFavouriteNotFoundByIdError";
import { PostFavouriteRepository } from "../repositories/PostFavouriteRepository";
import { FavouriteId } from "@/shared/favourite/domain/value-objects/FavouriteId";

export class PostFavouriteFinder {
  constructor(private postFavouriteRepository: PostFavouriteRepository) { }

  async findById(id: FavouriteId) {
    const postFavourite = await this.postFavouriteRepository.getOneById(id);
    if (!postFavourite) throw new PostFavouriteNotFoundByIdError(id.toPrimitives());
    return postFavourite;
  }
}