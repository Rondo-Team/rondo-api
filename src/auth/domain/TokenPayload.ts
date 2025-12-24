import { Role } from "./value-objects/Role.ts";
import { TokenPurpose } from "./value-objects/TokenPurpose.ts";

export type TokenPayload = {
  sub: string; // User id
  iat: number; // Created At
  exp: number; // Expire Time
  role: Role;
  purpose: TokenPurpose;
};
