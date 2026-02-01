import { POST_COMMENTS_UPPER_LIMIT } from "../../../config/domain/Consts.ts";
import { Count } from "../../../shared/domain/value-objects/Count.ts";
import { PostCommentsCountIsInvalidError } from "../errors/PostCommentsCountIsInvalidError.ts";

export class PostCommentsCount extends Count {
  readonly value: number;
  constructor(value: number) {
    super(value, POST_COMMENTS_UPPER_LIMIT);
    this.value = value;
  }

  protected CountIsInvalidError() {
    return new PostCommentsCountIsInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }

  static fromPrimitives(value: number) {
    return new PostCommentsCount(value);
  }
}
