import {
  DRAFT_TITLE_CHAR_LOWER_LIMIT,
  DRAFT_TITLE_CHAR_UPPER_LIMIT,
} from "@/config";
import { DraftTitleIsTooLongError } from "../errors/DraftTitleIsTooLongError";
import { DraftTitleIsTooShortError } from "../errors/DraftTitleIsTooShortError";

export class DraftTitle {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const titleLength = this.value.length;
    if (titleLength > DRAFT_TITLE_CHAR_UPPER_LIMIT)
      throw new DraftTitleIsTooLongError(this.value);
    if (titleLength < DRAFT_TITLE_CHAR_LOWER_LIMIT)
      throw new DraftTitleIsTooShortError(this.value);
  }

  toPrimitives() {
    return this.value;
  }
}
