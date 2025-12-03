import { POST_FAVOURITES_UPPER_LIMIT } from "../../../config/domain/Consts.ts";
import { Count } from "../../../shared/domain/value-objects/Count.ts";
import { PostFavouritesCountIsInvalidError } from "../errors/PostFavouritesCountIsInvalidError.ts";

export class PostFavouritesCount extends Count {
  readonly value: number;
  constructor(value: number) {
    super(value, POST_FAVOURITES_UPPER_LIMIT);
    this.value = value;
  }

  protected CountIsInvalidError() {
    return new PostFavouritesCountIsInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }
}
