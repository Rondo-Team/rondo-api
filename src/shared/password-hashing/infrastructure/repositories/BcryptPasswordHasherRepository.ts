import bcrypt from "bcrypt";
import { config } from "../../../../config/infrastructure/config.ts";
import type { PasswordHasherRepository } from "../../domain/repositories/PasswordHasherRepository.ts";

const salt = config.hashing.salt;

export class BcryptPasswordHasherRepository implements PasswordHasherRepository {
  public static async create() {
    return new BcryptPasswordHasherRepository();
  }

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, salt);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
