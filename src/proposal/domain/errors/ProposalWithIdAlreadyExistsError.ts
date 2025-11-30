import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class ProposalWithIdAlreadyExistsError extends DomainError {
    constructor(id: string) {
      super(`Proposal with id: ${id} already exists`, DomainErrorCode.PROPOSAL_WITH_ID_ALREADY_EXISTS)
    }
}