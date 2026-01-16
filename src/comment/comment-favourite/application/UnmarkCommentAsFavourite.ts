import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import { FavouriteId } from "../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { CommentRepository } from "../../domain/repositories/CommentRepository.ts";
import { CommentFinder } from "../../domain/services/CommentFinder.ts";
import type { CommentFavouriteRepository } from "../domain/repositories/CommentFavouriteRepository.ts";
import { CommentFavouriteFinder } from "../domain/services/CommentFavouriteFinder.ts";

export class UnmarkCommentAsFavourite {
  private commentFavouriteRepository: CommentFavouriteRepository;
  private readonly commmentFavouriteFinder: CommentFavouriteFinder;
  private resourceAccessChecker: ResourceAccessChecker;
  private commentRepository: CommentRepository;
  private commentFinder: CommentFinder;
  constructor(
    commentFavouriteRepository: CommentFavouriteRepository,
    commentRepository: CommentRepository
  ) {
    this.commentFavouriteRepository = commentFavouriteRepository;
    this.commmentFavouriteFinder = new CommentFavouriteFinder(
      commentFavouriteRepository
    );
    this.resourceAccessChecker = new ResourceAccessChecker();
    this.commentRepository = commentRepository;
    this.commentFinder = new CommentFinder(commentRepository);
  }

  async run(id: string, actorId: string) {
    const favouriteId = new FavouriteId(id);
    const commentFavourite = await this.commmentFavouriteFinder.findById(
      favouriteId
    );
    // Check permission
    await this.resourceAccessChecker.check(
      UserId.fromPrimitives(actorId),
      commentFavourite.userId
    );

    const comment = await this.commentFinder.findById(
      commentFavourite.commentId
    );

    // Triggers comment update
    comment.deleteFavourite();
    await this.commentRepository.edit(comment);

    return this.commentFavouriteRepository.deleteById(favouriteId);
  }
}
