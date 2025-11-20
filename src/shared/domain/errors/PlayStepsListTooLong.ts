import { PLAY_STEPS_UPPER_LIMIT } from "@/config";
import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PlayStepsListIsTooLongError extends DomainError {
  constructor() {
    super(
      `Play steps list is too long, try setting a list with no more than ${PLAY_STEPS_UPPER_LIMIT}`,
      DomainErrorCode.PLAY_STEPS_LIST_TOO_LONG
    );
  }
}
