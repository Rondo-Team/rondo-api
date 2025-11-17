import { DomainErrorCode } from "../domain/DomainErrorCode";

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
  [DomainErrorCode.ID_NOT_LONG_ENOUGH]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.COMMENTS_COUNT_INVALID]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_CREATION_DATE_INVALID]: HttpStatus.BAD_REQUEST,
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
  [DomainErrorCode.USERNAME_IS_INVALID]: HttpStatus.BAD_REQUEST
}