import { Container } from "inversify";
import { RefreshToken } from "./auth/application/use-cases/RefreshTokens.ts";
import { RefreshTokenEndpoint } from "./auth/infrastructure/controllers/RefreshTokenEndpoint.ts";
import { HonoTokenRepository } from "./auth/infrastructure/repositories/HonoTokenRepository.ts";
import { Token } from "./config/domain/Token.ts";
import { createHono } from "./shared/controllers/infrastructure/CreateHono.ts";
import { BcryptPasswordHasherRepository } from "./shared/password-hashing/infrastructure/repositories/BcryptPasswordHasherRepository.ts";
import { MongoModule } from "./shared/persistance/infrastructure/mongo/CreateMongoClient.ts";
import { ChangePassword } from "./user/application/use-cases/ChangePassword.ts";
import { ChangeUsername } from "./user/application/use-cases/ChangeUsername.ts";
import { DeleteUserById } from "./user/application/use-cases/DeleteUserById.ts";
import { GetUserById } from "./user/application/use-cases/GetUserById.ts";
import { LoginUser } from "./user/application/use-cases/LoginUser.ts";
import { RegisterUser } from "./user/application/use-cases/RegisterUser.ts";
import { UpdateUserProfile } from "./user/application/use-cases/UpdateUserProfile.ts";
import { ChangePasswordEndpoint } from "./user/infrastructure/controllers/ChangePasswordEndpoint.ts";
import { ChangeUsernameEndpoint } from "./user/infrastructure/controllers/ChangeUsernameEndpoint.ts";
import { DeleteUserByIdEndpoint } from "./user/infrastructure/controllers/DeleteUserByIdEndpoint.ts";
import { GetUserByIdEndpoint } from "./user/infrastructure/controllers/GetUserByIdEndpoint.ts";
import { GetUserProfileEndpoint } from "./user/infrastructure/controllers/GetUserProfileEndpoint.ts";
import { LoginUserEnpoint } from "./user/infrastructure/controllers/LoginUserEndpoint.ts";
import { RegisterUserEndpoint } from "./user/infrastructure/controllers/RegisterUserEndpoint.ts";
import { UpdateUserProfileEndpoint } from "./user/infrastructure/controllers/UpdateUserProfileEndpoint.ts";
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
  .bind(Token.GET_USER_BY_ID)
  .toDynamicValue(async (ctx) => {
    return new GetUserById(await ctx.getAsync(Token.USER_REPOSITORY));
  })
  .inSingletonScope();

container
  .bind(Token.DELETE_USER_BY_ID)
  .toDynamicValue(async (ctx) => {
    return new DeleteUserById(await ctx.getAsync(Token.USER_REPOSITORY));
  })
  .inSingletonScope();

container
  .bind(Token.UPDATE_USER_PROFILE)
  .toDynamicValue(async (ctx) => {
    return new UpdateUserProfile(await ctx.getAsync(Token.USER_REPOSITORY));
  })
  .inSingletonScope();

container
  .bind(Token.CHANGE_USERNAME)
  .toDynamicValue(async (ctx) => {
    return new ChangeUsername(await ctx.getAsync(Token.USER_REPOSITORY));
  })
  .inSingletonScope();

container
  .bind(Token.CHANGE_PASSWORD)
  .toDynamicValue(async (ctx) => {
    return new ChangePassword(
      await ctx.getAsync(Token.USER_REPOSITORY),
      await ctx.getAsync(Token.PASSWORD_HASHING_REPOSITORY)
    );
  })
  .inSingletonScope();

container
  .bind(Token.REFRESH_TOKEN)
  .toDynamicValue(async (ctx) => {
    return new RefreshToken(await ctx.getAsync(Token.TOKEN_REPOSITORY));
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

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getUserById = await ctx.getAsync<GetUserById>(Token.GET_USER_BY_ID);
    return GetUserByIdEndpoint(getUserById);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const deleteUserById = await ctx.getAsync<DeleteUserById>(
      Token.DELETE_USER_BY_ID
    );
    return DeleteUserByIdEndpoint(deleteUserById);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const updateUserProfile = await ctx.getAsync<UpdateUserProfile>(
      Token.UPDATE_USER_PROFILE
    );
    return UpdateUserProfileEndpoint(updateUserProfile);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const changeUsername = await ctx.getAsync<ChangeUsername>(
      Token.CHANGE_USERNAME
    );
    return ChangeUsernameEndpoint(changeUsername);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getUserById = await ctx.getAsync<GetUserById>(Token.GET_USER_BY_ID);
    return GetUserProfileEndpoint(getUserById);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const changePassword = await ctx.getAsync<ChangePassword>(
      Token.CHANGE_PASSWORD
    );
    return ChangePasswordEndpoint(changePassword);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const refreshToken = await ctx.getAsync<RefreshToken>(Token.REFRESH_TOKEN);
    return RefreshTokenEndpoint(refreshToken);
  })
  .inSingletonScope();

// App
container.bind(Token.APP).toDynamicValue(createHono).inSingletonScope();
