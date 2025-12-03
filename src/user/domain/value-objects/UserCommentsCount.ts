import { UPPER_COMMENTS_LIMIT } from "../../../config/domain/Consts.ts";
import { Count } from "../../../shared/domain/value-objects/Count.ts";
import { CommentsCountInvalidError } from "../errors/CommentsCountInvalidError.ts";

export class UserCommentsCount extends Count {
  constructor(readonly value: number) {
    super(value, UPPER_COMMENTS_LIMIT);
  }

  protected CountIsInvalidError() {
    return new CommentsCountInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }
}
