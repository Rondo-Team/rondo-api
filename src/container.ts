import { Container } from "inversify";
import { HonoTokenRepository } from "./auth/infrastructure/HonoTokenRepository.ts";
import { Token } from "./config/domain/Token.ts";
import { createHono } from "./shared/controllers/infrastructure/CreateHono.ts";
import { BcryptPasswordHasherRepository } from "./shared/password-hashing/infrastructure/repositories/BcryptPasswordHasherRepository.ts";
import { MongoModule } from "./shared/persistance/infrastructure/mongo/CreateMongoClient.ts";
import { LoginUser } from "./user/application/use-cases/LoginUser.ts";
import { RegisterUser } from "./user/application/use-cases/RegisterUser.ts";
import { LoginUserEnpoint } from "./user/infrastructure/controllers/LoginUserEndpoint.ts";
import { RegisterUserEndpoint } from "./user/infrastructure/controllers/RegisterUserEndpoint.ts";
import { MongoUserRepository } from "./user/infrastructure/repositories/MongoUserRepository.ts";

export const container = new Container();

// Mongo
container.load(MongoModule);

// Password Hashing
container
  .bind(Token.PASSWORD_HASHING_REPOSITORY)
  .toDynamicValue(BcryptPasswordHasherRepository.create)
  .inSingletonScope();

// Token
container
  .bind(Token.TOKEN_REPOSITORY)
  .toDynamicValue(HonoTokenRepository.create)
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
  .bind(Token.LOGIN_USER)
  .toDynamicValue(async (ctx) => {
    return new LoginUser(
      await ctx.getAsync(Token.USER_REPOSITORY),
      await ctx.getAsync(Token.PASSWORD_HASHING_REPOSITORY),
      await ctx.getAsync(Token.TOKEN_REPOSITORY)
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

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const loginUser = await ctx.getAsync<LoginUser>(Token.LOGIN_USER);
    return LoginUserEnpoint(loginUser);
  })
  .inSingletonScope();

// App
container.bind(Token.APP).toDynamicValue(createHono).inSingletonScope();
