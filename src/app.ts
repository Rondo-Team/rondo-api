import type { Express } from "express";
import { Token } from "./config/domain/Token.ts";
import { container } from "./container.ts";

export const app = await container.getAsync<Express>(Token.APP);
