/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export function validator<T extends ZodType>(
  source: "json" | "query" | "params",
  schema: T
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (source === "json") req.body = schema.parse(req.body);
      if (source === "query") req.query = schema.parse(req.query) as any;
      if (source === "params") req.params = schema.parse(req.params) as any;
    } catch (err) {
      next(err);
    }
  };
}
