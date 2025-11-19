import { UPPER_FAVOURITES_LIMIT } from "@/config";
import { CommentCountInvalidError } from "@/User/domain/errors/CommentsCountInvalidError";

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
      throw new CommentCountInvalidError(this.value);
  }
}
