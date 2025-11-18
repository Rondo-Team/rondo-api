import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserId } from "../../domain/value-objects/UserId";

export class DeleteUser {
  constructor(private repository: UserRepository) {}

  async run(id: string): Promise<void> {
    // Ensure user already exists
    this.repository.deleteById(new UserId(id))
  }
}