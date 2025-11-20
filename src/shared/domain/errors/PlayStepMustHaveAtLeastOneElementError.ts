import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PlayStepMustHaveAtLeastOneElementError extends DomainError {
  constructor() {
    super('Play step must have at least one element', DomainErrorCode.PLAY_STEP_MUST_HAVE_AT_LEAST_ONE_ELEMENT)
  }
}