import { User } from "../User.ts";
import { UserEmail } from "../value-objects/UserEmail.ts";
import { UserId } from "../value-objects/UserId.ts";
import { UserUsername } from "../value-objects/UserUsername.ts";

export interface UserRepository {
  create(user: User): Promise<void>;
  getOneById(id: UserId): Promise<User | undefined>;
  getOneByEmail(email: UserEmail): Promise<User | undefined>;
  existsWithId(id: UserId): Promise<boolean>;
  existsWithEmail(email: UserEmail): Promise<boolean>;
  existsWithUsername(username: UserUsername): Promise<boolean>;
  edit(user: User): Promise<void>;
  deleteById(id: UserId): Promise<void>;
}
