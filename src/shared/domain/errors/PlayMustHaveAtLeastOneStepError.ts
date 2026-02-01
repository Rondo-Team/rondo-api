import { DomainError } from "../../error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../error-handling/domain/DomainErrorCode.ts";

export class PlayMustHaveAtLeastOneStepError extends DomainError {
  constructor() {
    super(
      "Play must have at least one step",
      DomainErrorCode.PLAY_MUST_HAVE_AT_LEAST_ONE_STEP
    );
  }
}
