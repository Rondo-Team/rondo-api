import { UPPER_POSTS_LIMIT } from "../../../config/domain/Consts.ts";
import { Count } from "../../../shared/domain/value-objects/Count.ts";
import { PostsCountInvalidError } from "../errors/PostsCountInvalidError.ts";

export class UserPostsCount extends Count {
  readonly value: number;
  constructor(value: number) {
    super(value, UPPER_POSTS_LIMIT);
    this.value = value;
  }

  protected CountIsInvalidError() {
    return new PostsCountInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }

  static fromPrimitives(value: number) {
    return new UserPostsCount(value);
  }
}
