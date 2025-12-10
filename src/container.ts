import { Container } from "inversify";
import { Token } from "./config/domain/Token.ts";
import { createExpress } from "./shared/controllers/infrastructure/CreateExpress.ts";
import { createSwagger } from "./shared/controllers/infrastructure/CreateSwagger.ts";
import { errorMiddleware } from "./shared/controllers/infrastructure/middlewares/ErrorMiddleware.ts";
import { BcryptPasswordHasherRepository } from "./shared/password-hashing/infrastructure/repositories/BcryptPasswordHasherRepository.ts";
import { MongoModule } from "./shared/persistance/infrastructure/mongo/CreateMongoClient.ts";
import { RegisterUser } from "./user/application/use-cases/RegisterUser.ts";
import { MongoUserRepository } from "./user/infrastructure/repositories/MongoUserRepository.ts";
import { RegisterUserEndpoint } from "./user/infrastructure/controllers/RegisterUserEndpoint.ts";

export const container = new Container();

// Mongo
container.load(MongoModule);

// Password Hashing
container
  .bind(Token.PASSWORD_HASHING_REPOSITORY)
  .toDynamicValue(BcryptPasswordHasherRepository.create)
  .inSingletonScope();

// User
container
  .bind(Token.USER_REPOSITORY)
  .toDynamicValue(MongoUserRepository.create);
container
  .bind(Token.REGISTER_USER)
  .toDynamicValue(async (ctx) => {
    return new RegisterUser(
      await ctx.getAsync(Token.USER_REPOSITORY),
      await ctx.getAsync(Token.PASSWORD_HASHING_REPOSITORY)
    );
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const registerUser = await ctx.getAsync<RegisterUser>(Token.REGISTER_USER);
    return RegisterUserEndpoint(registerUser);
  })
  .inSingletonScope();

// App
container.bind(Token.APP).toDynamicValue(createExpress).inSingletonScope();
container
  .bind(Token.API_DOCS)
  .toDynamicValue(async (ctx) => {
    return await createSwagger(await ctx.getAllAsync(Token.ENDPOINT));
  })
  .inSingletonScope();

// Middlewares
container.bind(Token.ERROR_MIDDLEWARE).toConstantValue(errorMiddleware);
