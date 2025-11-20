import { POST_COMMENTS_UPPER_LIMIT } from "@/config";
import { PostCommentsCountIsInvalidError } from "../errors/PostCommentsCountIsInvalidError";

export class PostCommentsCount {
  value: number;

  constructor(value: number) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (
      !Number.isInteger(this.value) ||
      this.value < 0 ||
      this.value > POST_COMMENTS_UPPER_LIMIT
    )
      throw new PostCommentsCountIsInvalidError(this.value);
  }

  toPrimitive() {
    return this.value;
  }
}
