import { Role } from "./value-objects/Role.ts";
import { TokenPurpose } from "./value-objects/TokenPurpose.ts";

export type TokenPayload = {
  userId: string;
  createdAt: number;
  expireDate: number;
  role: Role;
  purpose: TokenPurpose;
};
