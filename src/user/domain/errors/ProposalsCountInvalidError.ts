import { UPPER_PROPOSALS_LIMIT } from "../../../config/domain/Consts.ts";
import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class ProposalsCountInvalidError extends DomainError {
  constructor(count: number) {
    super(
      `The proposals count ${count} is invalid, try setting it up as a positive integer, no longer than ${UPPER_PROPOSALS_LIMIT}`,
      DomainErrorCode.PROPOSALS_COUNT_INVALID
    );
  }
}
