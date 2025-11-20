import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PostWithUserNotFoundError extends DomainError {
  constructor(id: string) {
    super(
      `Post is associated to user with id: ${id} it could not be found`,
      DomainErrorCode.POST_WITH_USER_NOT_FOUND
    );
  }
}
