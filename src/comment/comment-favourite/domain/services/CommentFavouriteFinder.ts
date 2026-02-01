import { FavouriteId } from "../../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import { CommentFavouriteNotFoundByIdError } from "../errors/CommentFavouriteNotFoundByIdError.ts";
import type { CommentFavouriteRepository } from "../repositories/CommentFavouriteRepository.ts";

export class CommentFavouriteFinder {
  private commentFavouriteRepository: CommentFavouriteRepository
  constructor(commentFavouriteRepository: CommentFavouriteRepository) {
    this.commentFavouriteRepository = commentFavouriteRepository
  }

  async findById(id: FavouriteId) {
    const commentFavourite = await this.commentFavouriteRepository.getOneById(
      id
    );
    if (!commentFavourite)
      throw new CommentFavouriteNotFoundByIdError(id.toPrimitives());
    return commentFavourite;
  }
}
