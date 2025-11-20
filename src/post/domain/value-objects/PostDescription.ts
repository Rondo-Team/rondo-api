import {
  POST_DESCRIPTION_CHAR_LOWER_LIMIT,
  POST_DESCRIPTION_CHAR_UPPER_LIMIT,
} from "@/config";
import { PostDescriptionIsTooLongError } from "../errors/PostDescriptionIsTooLongError";
import { PostDescriptionIsTooShortError } from "../errors/PostDescriptionIsTooShortError";

export class PostDescription {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const descriptionLength = this.value.length;
    if (descriptionLength > POST_DESCRIPTION_CHAR_UPPER_LIMIT)
      throw new PostDescriptionIsTooLongError();
    if (descriptionLength < POST_DESCRIPTION_CHAR_LOWER_LIMIT)
      throw new PostDescriptionIsTooShortError();
  }

  toPrimitives() {
    return this.value;
  }
}
