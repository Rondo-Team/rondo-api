import { POST_FAVOURITES_UPPER_LIMIT } from "../../../config/domain/Consts.ts";
import { Count } from "../../../shared/domain/value-objects/Count.ts";
import { PostFavouritesCountIsInvalidError } from "../errors/PostFavouritesCountIsInvalidError.ts";

export class PostFavouritesCount extends Count {
  constructor(readonly value: number) {
    super(value, POST_FAVOURITES_UPPER_LIMIT);
  }

  protected CountIsInvalidError() {
    return new PostFavouritesCountIsInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }
}
