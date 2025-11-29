import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class CommentFavouriteNotFoundByIdError extends DomainError {
  constructor(id: string) {
    super(`Comment favourite with id: ${id} was not found`, DomainErrorCode.COMMENT_FAVOURITE_NOT_FOUND_BY_ID)
  }
}