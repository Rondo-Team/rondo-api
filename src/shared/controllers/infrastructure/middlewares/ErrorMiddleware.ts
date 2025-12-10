import type { NextFunction, Request, Response } from "express";
import { DomainError } from "../../../error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../error-handling/domain/DomainErrorCode.ts";
import { domainErrorToHTTPStatusCode } from "../../../error-handling/infrastructure/domainErrorToHTTPStatusCode.ts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorMiddleware(err: Error, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof DomainError) {
    return res.status(domainErrorToHTTPStatusCode[err.code]).json({
      code: err.code,
      type: err.name,
      message: err.message,
    });
  }

  return res.status(500).json({
    code: DomainErrorCode.INTERNAL_SERVER_ERROR,
    type: err.name,
    message: err.message
  });
}
