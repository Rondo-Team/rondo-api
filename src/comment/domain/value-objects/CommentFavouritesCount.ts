import { COMMENT_FAVOURITES_UPPER_LIMIT } from "../../../config/domain/Consts.ts";
import { Count } from "../../../shared/domain/value-objects/Count.ts";
import { CommentFavouritesCountIsInvalidError } from "../errors/CommentFavouritesCountIsInvalidError.ts";

export class CommentFavouritesCount extends Count {
  readonly value: number;
  constructor(value: number) {
    super(value, COMMENT_FAVOURITES_UPPER_LIMIT);
    this.value = value;
  }

  protected CountIsInvalidError() {
    return new CommentFavouritesCountIsInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }

  static fromPrimitives(value: number) {
    return new CommentFavouritesCount(value);
  }
}
