import { PLAY_STEPS_UPPER_LIMIT } from "../../../config/domain/Consts.ts";
import { DomainError } from "../../error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../error-handling/domain/DomainErrorCode.ts";

export class PlayStepsListIsTooLongError extends DomainError {
  constructor() {
    super(
      `Play steps list is too long, try setting a list with no more than ${PLAY_STEPS_UPPER_LIMIT}`,
      DomainErrorCode.PLAY_STEPS_LIST_TOO_LONG
    );
  }
}
