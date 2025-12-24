import { Hono } from "hono";
import { jwt } from "hono/jwt";
import type { ResolutionContext } from "inversify";
import { Token } from "../../../config/domain/Token.ts";
import { config } from "../../../config/infrastructure/config.ts";
import { errorMiddleware } from "./middlewares/ErrorMiddleware.ts";
import type { Endpoint } from "./types/Endpoint.ts";

export async function createHono(container: ResolutionContext) {
  const app = new Hono();
  const endpoints = await container.getAllAsync<Endpoint>(Token.ENDPOINT);

  endpoints.forEach((endpoint) => {
    const isSecured = endpoint.secured;
    const handlers = [
      ...(isSecured
        ? [
            jwt({
              secret: config.jwt.secret,
              cookie: "accessToken",
            }),
          ]
        : []),
      ...endpoint.handlers,
    ];
    app.on(endpoint.method, [endpoint.path], ...handlers);
  });

  app.onError(errorMiddleware);

  return app;
}
