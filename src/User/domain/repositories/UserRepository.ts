import { User } from "../User";
import { UserId } from "../value-objects/UserId";

export interface UserRepository {
  create(user: User): Promise<void>;
  getOneById(id: UserId): Promise<User | undefined>
  edit(user: User): Promise<void>
  deleteById(id: UserId): Promise<void>
}
