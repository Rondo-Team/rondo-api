import { POST_FAVOURITES_UPPER_LIMIT } from "@/config";
import { PostFavouritesCountIsInvalidError } from "../errors/PostFavouritesCountIsInvalidError";

export class PostFavouritesCount {
  value: number;

  constructor(value: number) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (
      !Number.isInteger(this.value) ||
      this.value < 0 ||
      this.value > POST_FAVOURITES_UPPER_LIMIT
    )
      throw new PostFavouritesCountIsInvalidError(this.value);
  }

  toPrimitives() {
    return this.value
  }
}
