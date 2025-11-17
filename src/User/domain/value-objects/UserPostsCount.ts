import { PostsCountInvalidError } from "../errors/PostsCountInvalidError";

export const UPPER_POSTS_LIMIT = 10 ^ 5;

export class UserPostsCount {
  value: number;

  constructor(value: number) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (
      !Number.isInteger(this.value) ||
      this.value < 0 ||
      this.value > UPPER_POSTS_LIMIT
    )
      throw new PostsCountInvalidError(this.value);
  }
}
