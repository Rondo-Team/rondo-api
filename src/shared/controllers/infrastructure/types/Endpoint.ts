import type { NextFunction, Request, Response } from "express";

export type Endpoint = {
  method: "put" | "post" | "patch" | "delete" | "get";
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  handlers: Array<ExpressHandler | Function>;
  secured?: boolean;
};

type ExpressHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) => unknown;
