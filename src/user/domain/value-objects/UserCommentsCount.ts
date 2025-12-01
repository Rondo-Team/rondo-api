import { UPPER_COMMENTS_LIMIT } from "@/config";
import { Count } from "@/shared/domain/value-objects/Count";
import { CommentsCountInvalidError } from "@/user/domain/errors/CommentsCountInvalidError";

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
