import { COMMENT_FAVOURITES_UPPER_LIMIT } from "../../../config/domain/Consts.ts";
import { Count } from "../../../shared/domain/value-objects/Count.ts";
import { CommentFavouritesCountIsInvalidError } from "../errors/CommentFavouritesCountIsInvalidError.ts";

export class CommentFavouritesCount extends Count {
  constructor(readonly value: number) {
    super(value, COMMENT_FAVOURITES_UPPER_LIMIT);
  }

  protected CountIsInvalidError() {
    return new CommentFavouritesCountIsInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }
}
