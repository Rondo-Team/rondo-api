import { POST_COMMENTS_UPPER_LIMIT } from "../../../config/domain/Consts.ts";
import { Count } from "../../../shared/domain/value-objects/Count.ts";
import { PostCommentsCountIsInvalidError } from "../errors/PostCommentsCountIsInvalidError.ts";

export class PostCommentsCount extends Count {
  constructor(readonly value: number) {
    super(value, POST_COMMENTS_UPPER_LIMIT);
  }

  protected CountIsInvalidError() {
    return new PostCommentsCountIsInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }
}
