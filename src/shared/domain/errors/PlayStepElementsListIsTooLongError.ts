import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PlayStepElementsListIsTooLongError extends DomainError {
  constructor() {
    super('Play step elements list is too long', DomainErrorCode.PLAY_STEP_ELEMENTS_LIST_TOO_LONG)
  }
}