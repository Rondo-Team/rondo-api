import { POST_FAVOURITES_UPPER_LIMIT } from "@/config";
import { Count } from "@/shared/domain/value-objects/Count";
import { PostFavouritesCountIsInvalidError } from "../errors/PostFavouritesCountIsInvalidError";

export class PostFavouritesCount extends Count {
  constructor(value: number) {
    super(value, POST_FAVOURITES_UPPER_LIMIT);
  }

  protected CountIsInvalidError() {
    return new PostFavouritesCountIsInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }
}
