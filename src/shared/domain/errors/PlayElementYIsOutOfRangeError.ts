import { DomainError } from "../../error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../error-handling/domain/DomainErrorCode.ts";

export class PlayElementYIsOutOfRangeError extends DomainError {
  constructor(y: number) {
    super(
      `Play element y coordinate value: ${y} is out of range. Coordinates are represented as percentages so it should be a number between 0 and 100`,
      DomainErrorCode.PLAY_ELEMENT_Y_OUT_OF_RANGE
    );
  }
}
