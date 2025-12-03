import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class ProposalTitleIsTooLongError extends DomainError {
  constructor(title: string) {
    super(
      `Proposal title: ${title} is too long`,
      DomainErrorCode.PROPOSAL_TITLE_TOO_LONG
    );
  }
}
