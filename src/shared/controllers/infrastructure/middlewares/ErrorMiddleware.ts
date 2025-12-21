import type { Context } from "hono";
import { DomainError } from "../../../error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../error-handling/domain/DomainErrorCode.ts";
import { domainErrorToHTTPStatusCode } from "../../../error-handling/infrastructure/domainErrorToHTTPStatusCode.ts";

export function errorMiddleware(err: Error, c: Context) {
  if (err instanceof DomainError) {
    c.status(domainErrorToHTTPStatusCode[err.code])
    return c.json({
      code: err.code,
      type: err.name,
      message: err.message,
    })
  }

  return c.json({
    code: DomainErrorCode.INTERNAL_SERVER_ERROR,
    type: err.name,
    message: err.message
  }, 500);
}
