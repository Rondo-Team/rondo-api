import type { ResolutionContext } from "inversify";
import { Db, type Collection } from "mongodb";
import { MongoCollections } from "../../../shared/persistance/infrastructure/mongo/MongoCollections.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { User, type UserPrimitives } from "../../domain/User.ts";
import type { UserEmail } from "../../domain/value-objects/UserEmail.ts";
import type { UserId } from "../../domain/value-objects/UserId.ts";
import type { UserUsername } from "../../domain/value-objects/UserUsername.ts";

export class MongoUserRepository implements UserRepository {
  private readonly users: Collection<UserPrimitives>;
  public static async create(container: ResolutionContext) {
    const db = await container.getAsync(Db);
    return new MongoUserRepository(db);
  }
  constructor(db: Db) {
    this.users = db.collection(MongoCollections.USERS);
  }

  async create(user: User): Promise<void> {
    const primitives = user.toPrimitives();
    await this.users.insertOne(primitives);
  }

  async getOneById(id: UserId): Promise<User | undefined> {
    const user = await this.users.findOne(
      { id: id.toPrimitives() },
      { projection: { _id: 0 } } // Excludes the mongo id from the returned document
    );
    return user ? User.fromPrimitives(user) : undefined;
  }

  async getOneByEmail(email: UserEmail): Promise<User | undefined> {
    const user = await this.users.findOne(
      { email: email.toPrimitives() },
      { projection: { _id: 0 } }
    );
    return user ? User.fromPrimitives(user) : undefined;
  }

  async existsWithId(id: UserId): Promise<boolean> {
    return (
      (await this.users.countDocuments(
        { id: id.toPrimitives() },
        { limit: 1 }
      )) > 0
    );
  }

  async existsWithEmail(email: UserEmail): Promise<boolean> {
    return (
      (await this.users.countDocuments(
        { email: email.toPrimitives() },
        { limit: 1 }
      )) > 0
    );
  }

  async existsWithUsername(username: UserUsername): Promise<boolean> {
    return (
      (await this.users.countDocuments(
        { username: username.toPrimitives() },
        { limit: 1 }
      )) > 0
    );
  }

  async edit(user: User): Promise<void> {
    const primitives = user.toPrimitives();
    await this.users.updateOne(
      { id: user.id.toPrimitives() },
      { $set: primitives } // In order to not delete the whole document
    );
  }

  async deleteById(id: UserId): Promise<void> {
    await this.users.deleteOne({ id: id.toPrimitives() });
  }
}
