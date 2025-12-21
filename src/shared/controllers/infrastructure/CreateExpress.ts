import express from "express";
import { expressjwt } from "express-jwt";
import type { ResolutionContext } from "inversify";
import swaggerUi from "swagger-ui-express";
import { Token } from "../../../config/domain/Token.ts";
import { config } from "../../../config/infrastructure/config.ts";
import type { Endpoint } from "./types/Endpoint/Endpoint.ts";
import type { ErrorMiddleware } from "./types/ErrorMiddleware.ts";

export async function createExpress(container: ResolutionContext) {
  const app = express();
  app.use(express.json());
  const endpoints = await container.getAllAsync<Endpoint>(Token.ENDPOINT);

  endpoints.forEach((endpoint) => {
    const isSecured = endpoint.secured;
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

  const swaggerSpec = await container.getAsync(Token.API_DOCS);
  app.use(`${config.app.baseUrl}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  const errorMiddleware = container.get<ErrorMiddleware>(
    Token.ERROR_MIDDLEWARE
  );

  app.use(errorMiddleware);
  return app;
}
