import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class ProposalTitleIsTooShortError extends DomainError {
  constructor(title: string) {
    super(`Proposal title ${title} is too short`, DomainErrorCode.PROPOSAL_TITLE_TOO_SHORT)
  }
}