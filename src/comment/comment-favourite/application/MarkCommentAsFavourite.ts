import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { FavouriteId } from "../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { CommentRepository } from "../../domain/repositories/CommentRepository.ts";
import { CommentFinder } from "../../domain/services/CommentFinder.ts";
import { CommentId } from "../../domain/value-objects/CommentId.ts";
import { CommentFavourite } from "../domain/CommentFavourite.ts";
import type { CommentFavouriteRepository } from "../domain/repositories/CommentFavouriteRepository.ts";

export class MarkCommentAsFavourite {
  private commentFavouriteRepository: CommentFavouriteRepository;
  private commentRepository: CommentRepository;
  private readonly commentFinder: CommentFinder;
  constructor(
    commentFavouriteRepository: CommentFavouriteRepository,
    commentRepository: CommentRepository
  ) {
    this.commentFavouriteRepository = commentFavouriteRepository;
    this.commentRepository = commentRepository;
    this.commentFinder = new CommentFinder(commentRepository);
  }

  async run(id: string, userId: string, createdAt: Date, commentId: string) {
    // Check user existance
    const comment = await this.commentFinder.findById(new CommentId(commentId));

    const commentFavourite = new CommentFavourite(
      new FavouriteId(id),
      new UserId(userId),
      new CreatedAt(createdAt),
      new CommentId(commentId)
    );

    // Triggers comment updates
    comment.addFavourite();
    await this.commentRepository.edit(comment);

    return this.commentFavouriteRepository.create(commentFavourite);
  }
}
