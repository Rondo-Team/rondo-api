import { UPPER_COMMENTS_LIMIT } from "../../../config/domain/Consts.ts";
import { Count } from "../../../shared/domain/value-objects/Count.ts";
import { CommentsCountInvalidError } from "../errors/CommentsCountInvalidError.ts";

export class UserCommentsCount extends Count {
  readonly value: number;
  constructor(value: number) {
    super(value, UPPER_COMMENTS_LIMIT);
    this.value = value;
  }

  protected CountIsInvalidError() {
    return new CommentsCountInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }

  static fromPrimitives(value: number) {
    return new UserCommentsCount(value);
  }
}
