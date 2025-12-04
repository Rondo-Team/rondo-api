import { Container } from "inversify";
import { Token } from "./config/domain/Token.ts";
import { createExpress } from "./shared/controllers/infrastructure/CreateExpress.ts";
import { errorMiddleware } from "./shared/controllers/infrastructure/middlewares/ErrorMiddleware.ts";
import { MongoModule } from "./shared/persistance/infrastructure/mongo/CreateMongoClient.ts";
import { BcryptPasswordHasher } from "./shared/services/bcrypt/infrastructure/BcryptPasswordHasher.ts";
import { RegisterUser } from "./user/application/use-cases/RegisterUser.ts";
import { CreateUserEndpoint } from "./user/infrastructure/controllers/CreateUserEndpoint.ts";
import { MongoUserRepository } from "./user/infrastructure/repositories/MongoUserRepository.ts";

export const container = new Container();

// Mongo
container.load(MongoModule);

// Password Hashing
//TODO
container.bind(Token.PASSWORD_HASHING_REPOSITORY);

// User
container
  .bind(Token.USER_REPOSITORY)
  .toDynamicValue(MongoUserRepository.create);
container.bind(Token.REGISTER_USER).toDynamicValue((ctx) => {
  return new RegisterUser(
    ctx.get(Token.USER_REPOSITORY),
    ctx.get(Token.PASSWORD_HASHING_REPOSITORY)
  );
});
container.bind(Token.ENDPOINT).toDynamicValue(async (ctx) => {
  const registerUser = await ctx.getAsync<RegisterUser>(Token.REGISTER_USER);
  return CreateUserEndpoint(registerUser);
});

// Services
container
  .bind(Token.PASSWORD_HASHER)
  .toDynamicValue(BcryptPasswordHasher.create);

// App
container.bind(Token.APP).toDynamicValue(createExpress);

// Middlewares
container.bind(Token.ERROR_MIDDLEWARE).toConstantValue(errorMiddleware);
