import { UPPER_FAVOURITES_LIMIT } from "@/config";
import { FavouritesCountInvalidError } from "../errors/FavouritesCountInvalidError";

export class UserFavouritePostsCount {
  value: number;

  constructor(value: number) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (
      !Number.isInteger(this.value) ||
      this.value < 0 ||
      this.value > UPPER_FAVOURITES_LIMIT
    )
      throw new FavouritesCountInvalidError(this.value);
  }
}
