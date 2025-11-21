import {
  DRAFT_DESCRIPTION_CHAR_LOWER_LIMIT,
  DRAFT_DESCRIPTION_CHAR_UPPER_LIMIT,
} from "@/config";
import { DraftDescriptionIsTooLongError } from "../errors/DraftDescriptionIsTooLongError";
import { DraftDescriptionIsTooShortError } from "../errors/DraftDescriptionIsTooShortError";

export class DraftDescription {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const descriptionLength = this.value.length;
    if (descriptionLength > DRAFT_DESCRIPTION_CHAR_UPPER_LIMIT)
      throw new DraftDescriptionIsTooLongError();
    if (descriptionLength < DRAFT_DESCRIPTION_CHAR_LOWER_LIMIT)
      throw new DraftDescriptionIsTooShortError();
  }

  toPrimitives() {
    return this.value;
  }
}
