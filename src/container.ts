import { Container } from "inversify";
import { RefreshToken } from "./auth/application/use-cases/RefreshTokens.ts";
import { RefreshTokenEndpoint } from "./auth/infrastructure/controllers/RefreshTokenEndpoint.ts";
import { HonoTokenRepository } from "./auth/infrastructure/repositories/HonoTokenRepository.ts";
import { Token } from "./config/domain/Token.ts";
import { ChangeDraftInformation } from "./draft/application/use-cases/ChangeDraftInformation.ts";
import { ChangeDraftPlay } from "./draft/application/use-cases/ChangeDraftPlay.ts";
import { CreateDraft } from "./draft/application/use-cases/CreateDraft.ts";
import { DeleteDraftById } from "./draft/application/use-cases/DeleteDraftById.ts";
import { GetAllDraftsByUserId } from "./draft/application/use-cases/GetAllDraftsByUserId.ts";
import { GetDraftById } from "./draft/application/use-cases/GetDraftById.ts";
import { ChangeDraftInformationEndpoint } from "./draft/infrastructure/controllers/ChangeDraftInformationEndpoint.ts";
import { ChangeDraftPlayEndpoint } from "./draft/infrastructure/controllers/ChangeDraftPlayEndpoint.ts";
import { CreateDraftEndpoint } from "./draft/infrastructure/controllers/CreateDraftEndpoint.ts";
import { DeleteDraftByIdEndpoint } from "./draft/infrastructure/controllers/DeleteDraftByIdEndpoint.ts";
import { GetAllDraftsByUserEndpoint } from "./draft/infrastructure/controllers/GetAllDraftsByUser.ts";
import { GetDraftByIdEndpoint } from "./draft/infrastructure/controllers/GetDraftByIdEndpoint.ts";
import { MongoDraftRepository } from "./draft/infrastructure/repositories/MongoDraftRepository.ts";
import { ChangePostInformation } from "./post/application/use-cases/ChangePostInformation.ts";
import { ChangePostPlay } from "./post/application/use-cases/ChangePostPlay.ts";
import { CreatePost } from "./post/application/use-cases/CreatePost.ts";
import { DeletePostById } from "./post/application/use-cases/DeletePostById.ts";
import { GetAllPostsByUserId } from "./post/application/use-cases/GetAllPostsByUserId.ts";
import { GetPostById } from "./post/application/use-cases/GetPostById.ts";
import { GetPostsByCriteria } from "./post/application/use-cases/GetPostsByCriteria.ts";
import { ChangePostInformationEndpoint } from "./post/infrastructure/controllers/ChangePostInformationEndpoint.ts";
import { ChangePostPlayEndpoint } from "./post/infrastructure/controllers/ChangePostPlayEndpoint.ts";
import { CreatePostEdpoint } from "./post/infrastructure/controllers/CreatePostEndpoint.ts";
import { DeletePostByIdEndpoint } from "./post/infrastructure/controllers/DeletePostByIdEndpoint.ts";
import { GetAllPostsByUserIdEndpoint } from "./post/infrastructure/controllers/GetAllPostsByUserIdEndpoint.ts";
import { GetPostByIdEnpoint } from "./post/infrastructure/controllers/GetPostByIdEndpoint.ts";
import { GetPostsByCriteriaEnpoint } from "./post/infrastructure/controllers/GetPostsByCriteriaEndpoint.ts";
import { MongoPostRepository } from "./post/infrastructure/repositories/MongoPostRepository.ts";
import { MarkPostAsFavourite } from "./post/post-favourite/application/use-cases/MarkPostAsFavourite.ts";
import { UnmarkPostAsFavourite } from "./post/post-favourite/application/use-cases/UnmarkPostAsFavourite.ts";
import { MarkPostAsFavouriteEndpoint } from "./post/post-favourite/infrastructure/controllers/MarkPostAsFavouriteEndpoint.ts";
import { UnmarkPostAsFavouriteEndpoint } from "./post/post-favourite/infrastructure/controllers/UnmarkPostAsFavouriteEndpoint.ts";
import { MongoPostFavouriteRepository } from "./post/post-favourite/infrastructure/repositories/MongoPostFavouriteRepository.ts";
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

// Draft
container
  .bind(Token.DRAFT_REPOSITORY)
  .toDynamicValue(MongoDraftRepository.create);

container
  .bind(Token.CREATE_DRAFT)
  .toDynamicValue(async (ctx) => {
    return new CreateDraft(
      await ctx.getAsync(Token.DRAFT_REPOSITORY),
      await ctx.getAsync(Token.USER_REPOSITORY)
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_DRAFT_BY_ID)
  .toDynamicValue(async (ctx) => {
    return new GetDraftById(await ctx.getAsync(Token.DRAFT_REPOSITORY));
  })
  .inSingletonScope();

container
  .bind(Token.DELETE_DRAFT_BY_ID)
  .toDynamicValue(async (ctx) => {
    return new DeleteDraftById(await ctx.getAsync(Token.DRAFT_REPOSITORY));
  })
  .inSingletonScope();

container
  .bind(Token.CHANGE_DRAFT_PLAY)
  .toDynamicValue(async (ctx) => {
    return new ChangeDraftPlay(await ctx.getAsync(Token.DRAFT_REPOSITORY));
  })
  .inSingletonScope();

container
  .bind(Token.CHANGE_DRAFT_INFORMATION)
  .toDynamicValue(async (ctx) => {
    return new ChangeDraftInformation(
      await ctx.getAsync(Token.DRAFT_REPOSITORY)
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_ALL_DRAFTS_BY_USER_ID)
  .toDynamicValue(async (ctx) => {
    return new GetAllDraftsByUserId(
      await ctx.getAsync(Token.DRAFT_REPOSITORY),
      await ctx.getAsync(Token.USER_REPOSITORY)
    );
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const createDraft = await ctx.getAsync<CreateDraft>(Token.CREATE_DRAFT);
    return CreateDraftEndpoint(createDraft);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getDraftById = await ctx.getAsync<GetDraftById>(
      Token.GET_DRAFT_BY_ID
    );
    return GetDraftByIdEndpoint(getDraftById);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const deleteDraftById = await ctx.getAsync<DeleteDraftById>(
      Token.DELETE_DRAFT_BY_ID
    );
    return DeleteDraftByIdEndpoint(deleteDraftById);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const changeDraftPlay = await ctx.getAsync<ChangeDraftPlay>(
      Token.CHANGE_DRAFT_PLAY
    );
    return ChangeDraftPlayEndpoint(changeDraftPlay);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const changeDraftInformation = await ctx.getAsync<ChangeDraftInformation>(
      Token.CHANGE_DRAFT_INFORMATION
    );
    return ChangeDraftInformationEndpoint(changeDraftInformation);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getAllDraftsByUserId = await ctx.getAsync<GetAllDraftsByUserId>(
      Token.GET_ALL_DRAFTS_BY_USER_ID
    );
    return GetAllDraftsByUserEndpoint(getAllDraftsByUserId);
  })
  .inSingletonScope();

// Post
container
  .bind(Token.POST_REPOSITORY)
  .toDynamicValue(MongoPostRepository.create);

container
  .bind(Token.POST_FAVOURITE_REPOSITORY)
  .toDynamicValue(MongoPostFavouriteRepository.create);

container
  .bind(Token.CREATE_POST)
  .toDynamicValue(async (ctx) => {
    return new CreatePost(
      await ctx.getAsync(Token.POST_REPOSITORY),
      await ctx.getAsync(Token.USER_REPOSITORY)
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_POST_BY_ID)
  .toDynamicValue(async (ctx) => {
    return new GetPostById(await ctx.getAsync(Token.POST_REPOSITORY));
  })
  .inSingletonScope();

container
  .bind(Token.GET_ALL_POSTS_BY_USER_ID)
  .toDynamicValue(async (ctx) => {
    return new GetAllPostsByUserId(
      await ctx.getAsync(Token.POST_REPOSITORY),
      await ctx.getAsync(Token.USER_REPOSITORY)
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_POSTS_BY_CRITERIA)
  .toDynamicValue(async (ctx) => {
    return new GetPostsByCriteria(await ctx.getAsync(Token.POST_REPOSITORY));
  })
  .inSingletonScope();

container
  .bind(Token.CHANGE_POST_PLAY)
  .toDynamicValue(async (ctx) => {
    return new ChangePostPlay(await ctx.getAsync(Token.POST_REPOSITORY));
  })
  .inSingletonScope();

container
  .bind(Token.CHANGE_POST_INFORMATION)
  .toDynamicValue(async (ctx) => {
    return new ChangePostInformation(await ctx.getAsync(Token.POST_REPOSITORY));
  })
  .inSingletonScope();

container
  .bind(Token.DELETE_POST_BY_ID)
  .toDynamicValue(async (ctx) => {
    return new DeletePostById(await ctx.getAsync(Token.POST_REPOSITORY));
  })
  .inSingletonScope();

container
  .bind(Token.MARK_POST_AS_FAVOURITE)
  .toDynamicValue(async (ctx) => {
    return new MarkPostAsFavourite(
      await ctx.getAsync(Token.POST_FAVOURITE_REPOSITORY),
      await ctx.getAsync(Token.USER_REPOSITORY),
      await ctx.getAsync(Token.POST_REPOSITORY)
    );
  })
  .inSingletonScope();

container
  .bind(Token.UNMARK_POST_AS_FAVOURITE)
  .toDynamicValue(async (ctx) => {
    return new UnmarkPostAsFavourite(
      await ctx.getAsync(Token.POST_FAVOURITE_REPOSITORY),
      await ctx.getAsync(Token.USER_REPOSITORY),
      await ctx.getAsync(Token.POST_REPOSITORY)
    );
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const createPost = await ctx.getAsync<CreatePost>(Token.CREATE_POST);
    return CreatePostEdpoint(createPost);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getPostById = await ctx.getAsync<GetPostById>(Token.GET_POST_BY_ID);
    return GetPostByIdEnpoint(getPostById);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getAllPostsByUserId = await ctx.getAsync<GetAllPostsByUserId>(
      Token.GET_ALL_POSTS_BY_USER_ID
    );
    return GetAllPostsByUserIdEndpoint(getAllPostsByUserId);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getPostsByCriteria = await ctx.getAsync<GetPostsByCriteria>(
      Token.GET_POSTS_BY_CRITERIA
    );
    return GetPostsByCriteriaEnpoint(getPostsByCriteria);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const changePostPlay = await ctx.getAsync<ChangePostPlay>(
      Token.CHANGE_POST_PLAY
    );
    return ChangePostPlayEndpoint(changePostPlay);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const changePostInformation = await ctx.getAsync<ChangePostInformation>(
      Token.CHANGE_POST_INFORMATION
    );
    return ChangePostInformationEndpoint(changePostInformation);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const deletePostById = await ctx.getAsync<DeletePostById>(
      Token.DELETE_POST_BY_ID
    );
    return DeletePostByIdEndpoint(deletePostById);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const markPostAsFavourite = await ctx.getAsync<MarkPostAsFavourite>(
      Token.MARK_POST_AS_FAVOURITE
    );
    return MarkPostAsFavouriteEndpoint(markPostAsFavourite);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const unmarkPostAsFavourite = await ctx.getAsync<UnmarkPostAsFavourite>(
      Token.UNMARK_POST_AS_FAVOURITE
    );
    return UnmarkPostAsFavouriteEndpoint(unmarkPostAsFavourite);
  })
  .inSingletonScope();
// App
container.bind(Token.APP).toDynamicValue(createHono).inSingletonScope();
