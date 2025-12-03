import { UPPER_POSTS_LIMIT } from "../../../config/domain/Consts.ts";
import { Count } from "../../../shared/domain/value-objects/Count.ts";
import { PostsCountInvalidError } from "../errors/PostsCountInvalidError.ts";

export class UserPostsCount extends Count {
  constructor(readonly value: number) {
    super(value, UPPER_POSTS_LIMIT);
  }

  protected CountIsInvalidError() {
    return new PostsCountInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }
}
