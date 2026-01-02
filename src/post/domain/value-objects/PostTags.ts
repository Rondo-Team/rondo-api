import { POST_TAGS_UPPER_LIMIT } from "../../../config/domain/Consts.ts";
import { PostTagIsInvalidError } from "../errors/PostTagIsInvalidError.ts";
import { PostTagsListHasRepeatedElementsError } from "../errors/PostTagsListHasRepeatedElementsError.ts";
import { PostTagsListIsTooLongError } from "../errors/PostTagsListIsTooLongError.ts";

export class PostTags {
  readonly value: string[];
  constructor(value: string[]) {
    this.value = value;
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

  static fromPrimitives(value: string[]) {
    return new PostTags(value);
  }

  static empty() {
    return new PostTags([]);
  }
}
