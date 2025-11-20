import { POST_TITLE_CHAR_LOWER_LIMIT, POST_TITLE_CHAR_UPPER_LIMIT } from "@/config";
import { PostTitleIsTooLongError } from "../errors/PostTitleIsTooLongError";
import { PostTitleIsTooShortError } from "../errors/PostTitleIsTooShortError";

export class PostTitle {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const titleLength = this.value.length;
    if (titleLength > POST_TITLE_CHAR_UPPER_LIMIT) throw new PostTitleIsTooLongError(this.value);
    if (titleLength < POST_TITLE_CHAR_LOWER_LIMIT) throw new PostTitleIsTooShortError(this.value);
  }

  toPrimitives() {
    return this.value;
  }
}
