import type { Endpoint } from "./types/Endpoint/Endpoint.ts";

export async function createSwagger(endpoints: Endpoint[]) {
  const paths = {};

  endpoints.forEach((endpoint) => {
    paths[endpoint.path] = paths[endpoint.path] || {};

    paths[endpoint.path][endpoint.method] = {
      tags: endpoint.docs?.tags ?? [],
      summary: endpoint.docs?.summary ?? endpoint.path,
      security: endpoint.docs?.security ?? [],
      requestBody: endpoint.docs?.requestBody,
      responses: endpoint.docs?.responses ?? {},
    };
  });

  return {
    openapi: "3.0.0",
    info: {
      title: "Rondo API",
      version: "1.0.0",
    },
    paths,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  };
}
