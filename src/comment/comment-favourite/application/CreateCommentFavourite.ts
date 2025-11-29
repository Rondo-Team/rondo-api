import { CommentRepository } from "@/comment/domain/repositories/CommentRepository";
import { CommentFinder } from "@/comment/domain/services/CommentFinder";
import { CommentId } from "@/comment/domain/value-objects/CommentId";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { FavouriteId } from "@/shared/favourite/domain/value-objects/FavouriteId";
import { UserFinder } from "@/user/domain/services/UserFinder";
import { UserId } from "@/user/domain/value-objects/UserId";
import { CommentFavourite } from "../domain/CommentFavourite";
import { CommentFavouriteRepository } from "../domain/repositories/CommentFavouriteRepository";


export class CreatePostFavourite {
  private readonly commentFinder: CommentFinder
  constructor(
    private commentFavouriteRepository: CommentFavouriteRepository,
    private commentRepository: CommentRepository
  ) {
    this.commentFinder = new CommentFinder(commentRepository)
  }

  async run(
    id: string,
    userId: string,
    createdAt: Date,
    commentId: string
  ) {
    // Check user existance
    const comment = await this.commentFinder.findById(new CommentId(commentId))

    const commentFavourite = new CommentFavourite(
      new FavouriteId(id),
      new UserId(userId),
      new CreatedAt(createdAt),
      new CommentId(commentId)
    )

    // Triggers user and post updates
    comment.addFavourite()
    await this.commentRepository.edit(comment)

    return this.commentFavouriteRepository.create(commentFavourite)
  }
}