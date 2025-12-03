import { POST_PROPOSALS_UPPER_LIMIT } from "@/config/domain/Consts";
import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PostProposalsCountIsInvalidError extends DomainError {
  constructor(proposalsCount: number) {
    super(
      `Post proposals count: ${proposalsCount} is invalid, try setting it up as a positive integer, no longer than ${POST_PROPOSALS_UPPER_LIMIT}`,
      DomainErrorCode.POST_PROPOSALS_COUNT_INVALID
    );
  }
}
