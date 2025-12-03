import { DomainError } from "../../error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../error-handling/domain/DomainErrorCode.ts";

export class PlayStepElementsListIsTooLongError extends DomainError {
  constructor() {
    super(
      "Play step elements list is too long",
      DomainErrorCode.PLAY_STEP_ELEMENTS_LIST_TOO_LONG
    );
  }
}
