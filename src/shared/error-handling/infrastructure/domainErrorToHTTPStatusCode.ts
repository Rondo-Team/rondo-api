import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

const HttpStatus = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
}

type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus]

export const domainErrorToHTTPStatusCode: Record<DomainErrorCode, HttpStatus> = {
  [DomainErrorCode.ID_NOT_VALID]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.COMMENTS_COUNT_INVALID]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.CREATION_DATE_INVALID]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.FAVOURITES_COUNT_INVALID]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_NAME_IS_TOO_LONG]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_NAME_IS_TOO_SHORT]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_NAME_CONTAINS_INVALID_CHARACTERS]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.PASSWORD_IS_INVALID]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.POSTS_COUNT_INVALID]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.PROFILE_PICTURE_IS_INVALID]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_EMAIL_IS_INVALID]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.PROPOSALS_COUNT_INVALID]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USERNAME_IS_TOO_LONG]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USERNAME_IS_TOO_SHORT]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USERNAME_IS_INVALID]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.HASHED_PASSWORD_TOO_SHORT]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_WITH_ID_ALREADY_EXISTS]: HttpStatus.CONFLICT,
  [DomainErrorCode.USER_WITH_EMAIL_ALREADY_EXISTS]: HttpStatus.CONFLICT,
  [DomainErrorCode.USER_WITH_USERNAME_ALREADY_EXISTS]: HttpStatus.CONFLICT,
  [DomainErrorCode.USER_NOT_FOUND_BY_ID]: HttpStatus.NOT_FOUND,
  [DomainErrorCode.EMAIL_AND_NEW_EMAIL_ARE_EQUAL]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.NAME_AND_NEW_NAME_ARE_EQUAL]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.INCORRECT_PASSWORD]: HttpStatus.UNAUTHORIZED,
  [DomainErrorCode.USERNAME_AND_NEW_USERNAME_ARE_EQUAL]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_NOT_FOUND_BY_EMAIL]: HttpStatus.NOT_FOUND,
}