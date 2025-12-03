import bcrypt from "bcrypt";
import type { PasswordHasherRepository } from "../../../password-hashing/domain/repositories/PasswordHasherRepository.ts";
import { config } from "../../../../config/infrastructure/config.ts";

const salt = config.hashing.salt

export class BcryptPasswordHasher implements PasswordHasherRepository {
  public static async create() {
    return new BcryptPasswordHasher();
  }

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, salt);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
