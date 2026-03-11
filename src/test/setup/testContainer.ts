import { Token } from "../../config/domain/Token.ts";
import { container as standardContainer } from "../../container.ts";
import { type MongoOptions } from "../../shared/persistance/infrastructure/mongo/CreateMongoClient.ts";
import { testMongoOptions } from "./mongo.setup.ts";

standardContainer
  .rebindSync<MongoOptions>(Token.DB_CONFIG)
  .toConstantValue(testMongoOptions);

export const container = standardContainer;
