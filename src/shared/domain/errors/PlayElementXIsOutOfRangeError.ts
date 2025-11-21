import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PlayElementXIsOutOfRangeError extends DomainError {
  constructor(x: number) {
    super(
      `Play element x coordinate value: ${x} is out of range. Coordinates are represented as percentages so it should be a number between 0 and 100`,
      DomainErrorCode.PLAY_ELEMENT_X_OUT_OF_RANGE
    );
  }
}
