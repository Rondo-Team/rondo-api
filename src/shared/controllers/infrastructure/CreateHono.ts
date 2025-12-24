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
    if (isSecured)
      app.use(
        endpoint.path,
        jwt({
          secret: config.jwt.secret,
          cookie: "accessToken",
        })
      );
    app.on(endpoint.method, [endpoint.path], ...endpoint.handlers);
  });

  app.onError(errorMiddleware);

  return app;
}
