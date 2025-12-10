import type { RequestHandler } from "express";
import type { EndpointDocs } from "./EndpointDocs.ts";

export type Endpoint = {
  method: "put" | "post" | "patch" | "delete" | "get";
  path: string;
  handlers: Array<RequestHandler>;
  secured: boolean;
  docs?: EndpointDocs;
};
