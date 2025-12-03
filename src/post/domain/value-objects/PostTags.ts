import { POST_TAGS_UPPER_LIMIT } from "@/config/domain/Consts";
import { PostTagsListIsTooLongError } from "@/post/domain/errors/PostTagsListIsTooLongError";
import { PostTagIsInvalidError } from "../errors/PostTagIsInvalidError";
import { PostTagsListHasRepeatedElementsError } from "../errors/PostTagsListHasRepeatedElementsError";

export class PostTags {
  constructor(readonly value: string[]) {
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value.length > POST_TAGS_UPPER_LIMIT)
      throw new PostTagsListIsTooLongError();

    const uniqueTags = new Set(this.value).size;
    if (uniqueTags !== this.value.length)
      throw new PostTagsListHasRepeatedElementsError();

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
    return new PostTags([]);
  }
}
