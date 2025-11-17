import { DomainError } from "../DomainError";
import { DomainErrorCode } from "../DomainErrorCode";

export class IdNotLongEnough extends DomainError {
  constructor(id: string) {
    super(`Id: ${id} is not long enough, minimun length is 5 characters`, DomainErrorCode.ID_NOT_LONG_ENOUGH)
  }
}