import { POST_TAGS_UPPER_LIMIT } from "@/config";
import { PostTagsListIsTooLongError } from "@/post/domain/errors/PostTagsListIsTooLongError";
import { PostTagIsInvalidError } from "../errors/PostTagIsInvalidError";

export class PostTags {
  value: string[];

  constructor(value: string[]) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value.length > POST_TAGS_UPPER_LIMIT)
      throw new PostTagsListIsTooLongError();

    // Check each tag with regex (only chars and numbers)
    const regex = /^[a-zA-Z0-9]+$/;
    this.value.forEach((tag) => {
      if (!regex.test(tag)) throw new PostTagIsInvalidError(tag);
    });
  }

  toPrimitives() {
    return this.value;
  }

  static empty() {
    return new PostTags([])
  }
}
