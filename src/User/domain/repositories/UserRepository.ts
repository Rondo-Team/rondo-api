import { User } from "../User";
import { UserEmail } from "../value-objects/UserEmail";
import { UserId } from "../value-objects/UserId";
import { UserUsername } from "../value-objects/UserUsername";

export interface UserRepository {
  create(user: User): Promise<void>;
  getOneById(id: UserId): Promise<User | undefined>
  existsWithId(id: UserId): Promise<boolean>
  existsWithEmail(email: UserEmail): Promise<boolean>
  existsWithUsername(username: UserUsername): Promise<boolean>
  edit(user: User): Promise<void>
  deleteById(id: UserId): Promise<void>
}
