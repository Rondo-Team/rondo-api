import { Role } from "./value-objects/Role.ts";
import { TokenPurpose } from "./value-objects/TokenPurpose.ts";

export interface TokenPayload {
  userId: string;
  createdAt: string;
  expireDate: string;
  role: Role;
  purpose: TokenPurpose;
}
