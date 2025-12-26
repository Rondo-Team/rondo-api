import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { openAPISpecs } from "hono-openapi";
import { app } from "./app.ts";
import { config } from "./config/infrastructure/config.ts";

app.get("/", (c) => {
  return c.text("Hello!");
});

app.get("/ui", swaggerUI({ url: "/docs" }));

app.get(
  "/docs",
  openAPISpecs(app, {
    documentation: {
      info: {
        title: "Rondo API",
        version: "1.0.0",
        description: "A service for managing football strategies",
      },
      components: {
        securitySchemes: {
          cookieAuth: {
            type: "apiKey",
            in: "cookie",
            name: "accessToken",
          },
        },
      },
      servers: [{ url: "http://localhost:3000", description: "Local Server" }],
    },
  })
);

serve(
  {
    fetch: app.fetch,
    port: config.app.port,
  },
  (info) => {
    const url = `http://localhost:${info.port}`;
    console.log(`Server listening on ${url}`);
    console.log(`Swagger Docs available at ${url}/docs`);
    console.log(`Swagger UI available at ${url}/ui`);
  }
);
