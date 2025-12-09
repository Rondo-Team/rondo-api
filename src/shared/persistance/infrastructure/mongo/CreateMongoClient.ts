import { ContainerModule, type ResolutionContext } from "inversify";
import { Db, MongoClient } from "mongodb";
import { Token } from "../../../../config/domain/Token.ts";
import { config } from "../../../../config/infrastructure/config.ts";

export type MongoOptions = {
  username: string;
  password: string;
  host: string;
  port: number;
  database: string;
};

export async function createMongoClient(container: ResolutionContext) {
  const { username, password, host } = container.get<MongoOptions>(
    Token.DB_CONFIG
  );
  return new MongoClient(
    `mongodb+srv://${username}:${password}@${host}`
  );
}

export async function createDb(container: ResolutionContext) {
  const client = await container.getAsync(MongoClient);
  const { database } = container.get<MongoOptions>(Token.DB_CONFIG);
  return client.db(database);
}

export const MongoModule = new ContainerModule(({ bind }) => {
  bind(MongoClient).toDynamicValue(createMongoClient);
  bind(Db).toDynamicValue(createDb);
  bind(Token.DB_CONFIG).toConstantValue(config.db);
});
