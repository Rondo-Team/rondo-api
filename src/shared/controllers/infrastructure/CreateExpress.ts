import express from "express";
import { expressjwt } from "express-jwt";
import { ResolutionContext } from "inversify";
import { Token } from "../../../config/domain/Token.ts";
import { config } from "../../../config/infrastructure/config.ts";
import { Endpoint } from "./types/Endpoint.ts";
import { ErrorMiddleware } from "./types/ErrorMiddleware.ts";

export async function createExpress(container: ResolutionContext) {
  const app = express();
  const endpoints = container.getAll<Endpoint>(Token.ENDPOINT);

  endpoints.forEach((endpoint) => {
    const isSecured = endpoint.secured ?? true;
    const handlers = [
      ...(isSecured
        ? [
            expressjwt({
              secret: config.jwt.secret,
              algorithms: ["HS256"],
              getToken: (req) => req.cookies?.accessToken,
            }),
          ]
        : []),
      ...endpoint.handlers,
    ];
    app[endpoint.method](endpoint.path, ...handlers);
  });
  const errorMiddleware = container.get<ErrorMiddleware>(
    Token.ERROR_MIDDLEWARE
  );

  app.use(errorMiddleware);
  return app;
}
