import { UPPER_FAVOURITES_LIMIT } from "../../../config/domain/Consts.ts";
import { Count } from "../../../shared/domain/value-objects/Count.ts";
import { FavouritesCountInvalidError } from "../errors/FavouritesCountInvalidError.ts";

export class UserFavouritePostsCount extends Count {
  readonly value: number;
  constructor(value: number) {
    super(value, UPPER_FAVOURITES_LIMIT);
    this.value = value;
  }

  protected CountIsInvalidError() {
    return new FavouritesCountInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }
}
