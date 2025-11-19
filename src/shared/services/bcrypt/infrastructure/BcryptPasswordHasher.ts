import bcrypt from "bcrypt";
import { PasswordHasherRepository } from "@/shared/password-hashing/domain/repositories/PasswordHasherRepository";

const SALT = process.env.HASH_SALT ?? 10;

export class BcryptPasswordHasher implements PasswordHasherRepository {
  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, SALT);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
