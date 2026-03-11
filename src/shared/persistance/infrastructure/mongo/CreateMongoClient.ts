import { ContainerModule, type ResolutionContext } from "inversify";
import { Db, MongoClient } from "mongodb";
import { Token } from "../../../../config/domain/Token.ts";
import { config } from "../../../../config/infrastructure/config.ts";

export type MongoOptions = {
  uri: string;
  database: string;
};

export async function createMongoClient(container: ResolutionContext) {
  const { uri } = container.get<MongoOptions>(Token.DB_CONFIG);
  return new MongoClient(uri);
}

export async function createDb(container: ResolutionContext) {
  const client = await container.getAsync(MongoClient);
  const { database } = container.get<MongoOptions>(Token.DB_CONFIG);
  return client.db(database);
}

export const MongoModule = new ContainerModule(({ bind }) => {
  bind(MongoClient).toDynamicValue(createMongoClient).inSingletonScope();
  bind(Db).toDynamicValue(createDb).inSingletonScope();
  bind(Token.DB_CONFIG).toConstantValue(config.db);
});
