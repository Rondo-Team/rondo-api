import { User } from "@/user/domain/User";
import { UserEmail } from "@/user/domain/value-objects/UserEmail";
import { UserId } from "@/user/domain/value-objects/UserId";
import { UserUsername } from "@/user/domain/value-objects/UserUsername";

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
