import { UPPER_FAVOURITES_LIMIT } from "@/config";
import { Count } from "@/shared/domain/value-objects/Count";
import { FavouritesCountInvalidError } from "@/user/domain/errors/FavouritesCountInvalidError";

export class UserFavouritePostsCount extends Count {
  constructor(value: number) {
    super(value, UPPER_FAVOURITES_LIMIT);
  }

  protected CountIsInvalidError() {
    return new FavouritesCountInvalidError(this.value);
  }
}
