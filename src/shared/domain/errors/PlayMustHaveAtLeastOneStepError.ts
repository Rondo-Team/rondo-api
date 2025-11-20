import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PlayMustHaveAtLeastOneStepError extends DomainError {
  constructor() {
    super('Play must have at least one step', DomainErrorCode.PLAY_MUST_HAVE_AT_LEAST_ONE_STEP)
  }
}