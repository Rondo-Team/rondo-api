import { PasswordHasherRepository } from "../domain/repositories/PasswordHasherRepository";
import bcrypt from "bcrypt"

const SALT = process.env.HASH_SALT ?? 10


export class BcryptPasswordHasher implements PasswordHasherRepository {
  async hash(plain: string) {
    return bcrypt.hash(plain, SALT);
  }

  async compare(plain: string, hashed: string) {
    return bcrypt.compare(plain, hashed);
  }
}