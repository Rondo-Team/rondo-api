import { CommentId } from "@/comment/domain/value-objects/CommentId";
import { CommentFavouriteNotFoundByIdError } from "../errors/CommentFavouriteNotFoundByIdError";
import { CommentFavouriteRepository } from "../repositories/CommentFavouriteRepository";

export class CommentFavouriteFinder {
  constructor(private commentFavouriteRepository: CommentFavouriteRepository) { }

  async findById(id: CommentId) {
    const commentFavourite = await this.commentFavouriteRepository.getOneById(id);
    if (!commentFavourite) throw new CommentFavouriteNotFoundByIdError(id.toPrimitives());
    return commentFavourite;
  }
}
