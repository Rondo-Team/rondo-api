import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PostFavouriteNotFoundByIdError extends DomainError {
  constructor(id: string) {
    super(`Post favourite with id: ${id} does not exists`, DomainErrorCode.POST_FAVOURITE_NOT_FOUND_BY_ID)
  }
}