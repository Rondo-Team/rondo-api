import { DomainError } from "../../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../../shared/error-handling/domain/DomainErrorCode.ts";

export class PostFavouriteWithIdAlreadyExistsError extends DomainError {
  constructor(id: string) {
    super(
      `Post favourite with id: ${id} already exists`,
      DomainErrorCode.POST_FAVOURITE_WITH_ID_ALREADY_EXISTS
    );
  }
}
