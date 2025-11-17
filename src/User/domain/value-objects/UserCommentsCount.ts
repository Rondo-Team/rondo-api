import { CommentCountInvalidError } from "../errors/CommentsCountInvalidError";

export const UPPER_COMMENTS_LIMIT = 10 ^ 9;

export class UserCommentsCount {
  value: number;

  constructor(value: number) {
    this.value = value;
    this.ensureIsValid()
  }

  private ensureIsValid() {
    if (
      !Number.isInteger(this.value) ||
      this.value < 0 ||
      this.value > UPPER_COMMENTS_LIMIT
    )
      throw new CommentCountInvalidError(this.value);
  }
}
