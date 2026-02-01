import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class UsernameChangingCooldownError extends DomainError {
  constructor(){
    super("You must wait 20 from the last modification to change again username", DomainErrorCode.USERNAME_CHANGE_IN_COOLDOWN)
  }
}