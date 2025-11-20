import { UPPER_POSTS_LIMIT } from "@/config";
import { PostsCountInvalidError } from "@/user/domain/errors/PostsCountInvalidError";

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
