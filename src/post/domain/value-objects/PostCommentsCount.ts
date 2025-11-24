import { POST_COMMENTS_UPPER_LIMIT } from "@/config";
import { Count } from "@/shared/domain/value-objects/Count";
import { PostCommentsCountIsInvalidError } from "../errors/PostCommentsCountIsInvalidError";

export class PostCommentsCount extends Count {
  constructor(value: number) {
    super(value, POST_COMMENTS_UPPER_LIMIT);
  }

  protected CountIsInvalidError() {
    return new PostCommentsCountIsInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }
}
