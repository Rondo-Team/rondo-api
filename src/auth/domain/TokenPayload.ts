import { Role } from "@/auth/domain/value-objects/Role";
import { TokenPurpose } from "./value-objects/TokenPurpose";

export interface TokenPayload {
  userId: string,
  createdAt: string,
  expireDate: string
  role: Role,
  purpose: TokenPurpose
}