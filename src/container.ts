import { Container } from "inversify";
import { RefreshToken } from "./auth/application/use-cases/RefreshTokens.ts";
import type { TokenRepository } from "./auth/domain/repositories/TokenRepository.ts";
import { RefreshTokenEndpoint } from "./auth/infrastructure/controllers/RefreshTokenEndpoint.ts";
import { HonoTokenRepository } from "./auth/infrastructure/repositories/HonoTokenRepository.ts";
import { CreateComment } from "./comment/application/use-cases/CreateComment.ts";
import { DeleteCommentById } from "./comment/application/use-cases/DeleteCommentById.ts";
import { GetAllCommentsByPostId } from "./comment/application/use-cases/GetAllCommentsByPostId.ts";
import { GetCommentById } from "./comment/application/use-cases/GetCommentById.ts";
import { ReplyComment } from "./comment/application/use-cases/ReplyComment.ts";
import { GetAllCommentFavouritesByCommentId } from "./comment/comment-favourite/application/GetAllCommentFavouritesByCommentId.ts";
import { MarkCommentAsFavourite } from "./comment/comment-favourite/application/MarkCommentAsFavourite.ts";
import { UnmarkCommentAsFavourite } from "./comment/comment-favourite/application/UnmarkCommentAsFavourite.ts";
import type { CommentFavouriteRepository } from "./comment/comment-favourite/domain/repositories/CommentFavouriteRepository.ts";
import { GetAllCommentFavouritesByCommentIdEndpoint } from "./comment/comment-favourite/infrastructure/controllers/GetAllCommentFavouritesByCommentIdEndpoint.ts";
import { MarkCommentAsFavouriteEndpoint } from "./comment/comment-favourite/infrastructure/controllers/MarkCommentAsFavouriteEndpoint.ts";
import { UnmarkCommentAsFavouriteEndpoint } from "./comment/comment-favourite/infrastructure/controllers/UnmarkCommentAsFavouriteEndpoint.ts";
import { MongoCommentFavouriteRepository } from "./comment/comment-favourite/infrastructure/repositories/MongoCommentFavouriteRepository.ts";
import type { CommentRepository } from "./comment/domain/repositories/CommentRepository.ts";
import { CreateCommentEndpoint } from "./comment/infrastructure/controllers/CreateCommentEndpoint.ts";
import { DeleteCommentByIdEndpoint } from "./comment/infrastructure/controllers/DeleteCommentByIdEndpoint.ts";
import { GetAllCommentsByPostIdEndpoint } from "./comment/infrastructure/controllers/GetAllCommentsByPostIdEndpoint.ts";
import { GetCommentByIdEndpoint } from "./comment/infrastructure/controllers/GetCommentByIdEndpoint.ts";
import { ReplyCommentEndpoint } from "./comment/infrastructure/controllers/ReplyCommentEndpoint.ts";
import { MongoCommentRepository } from "./comment/infrastructure/repositories/MongoCommentRepository.ts";
import { Token } from "./config/domain/Token.ts";
import { ChangeDraftInformation } from "./draft/application/use-cases/ChangeDraftInformation.ts";
import { ChangeDraftPlay } from "./draft/application/use-cases/ChangeDraftPlay.ts";
import { CreateDraft } from "./draft/application/use-cases/CreateDraft.ts";
import { DeleteDraftById } from "./draft/application/use-cases/DeleteDraftById.ts";
import { GetAllDraftsByUserId } from "./draft/application/use-cases/GetAllDraftsByUserId.ts";
import { GetDraftById } from "./draft/application/use-cases/GetDraftById.ts";
import type { DraftRepository } from "./draft/domain/repositories/DraftRepository.ts";
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
import { GetTrendingPost } from "./post/application/use-cases/GetTrendingPost.ts";
import type { PostReadModelRepository } from "./post/domain/repositories/PostReadModelRepository.ts";
import type { PostRepository } from "./post/domain/repositories/PostRepository.ts";
import { ChangePostInformationEndpoint } from "./post/infrastructure/controllers/ChangePostInformationEndpoint.ts";
import { ChangePostPlayEndpoint } from "./post/infrastructure/controllers/ChangePostPlayEndpoint.ts";
import { CreatePostEdpoint } from "./post/infrastructure/controllers/CreatePostEndpoint.ts";
import { DeletePostByIdEndpoint } from "./post/infrastructure/controllers/DeletePostByIdEndpoint.ts";
import { GetAllPostsByUserIdEndpoint } from "./post/infrastructure/controllers/GetAllPostsByUserIdEndpoint.ts";
import { GetPostByIdEnpoint } from "./post/infrastructure/controllers/GetPostByIdEndpoint.ts";
import { GetPostsByCriteriaEnpoint } from "./post/infrastructure/controllers/GetPostsByCriteriaEndpoint.ts";
import { GetTrendingPostEndpoint } from "./post/infrastructure/controllers/GetTrendingPostEndpoint.ts";
import { MongoPostReadModelRepository } from "./post/infrastructure/repositories/MongoPostReadModelRepository.ts";
import { MongoPostRepository } from "./post/infrastructure/repositories/MongoPostRepository.ts";
import { GetAllPostFavouritesByPostId } from "./post/post-favourite/application/use-cases/GetAllPostFavouritesByPostId.ts";
import { GetAllPostFavouritesByUserId } from "./post/post-favourite/application/use-cases/GetAllPostFavouritesByUserId.ts";
import { MarkPostAsFavourite } from "./post/post-favourite/application/use-cases/MarkPostAsFavourite.ts";
import { UnmarkPostAsFavourite } from "./post/post-favourite/application/use-cases/UnmarkPostAsFavourite.ts";
import { UserHasLikedPost } from "./post/post-favourite/application/use-cases/UserHasLikedPost.ts";
import type { PostFavouriteRepository } from "./post/post-favourite/domain/repositories/PostFavouriteRepository.ts";
import { GetAllFavouritesByPostIdEndpoint } from "./post/post-favourite/infrastructure/controllers/GetAllFavouritesByPostIdEndpoint.ts";
import { GetAllFavouritesByUserIdEndpoint } from "./post/post-favourite/infrastructure/controllers/GetAllPostFavouritesByUserIdEndpoint.ts";
import { MarkPostAsFavouriteEndpoint } from "./post/post-favourite/infrastructure/controllers/MarkPostAsFavouriteEndpoint.ts";
import { UnmarkPostAsFavouriteEndpoint } from "./post/post-favourite/infrastructure/controllers/UnmarkPostAsFavouriteEndpoint.ts";
import { UserHasLikedPostEndpoint } from "./post/post-favourite/infrastructure/controllers/UserHasLikedPostEndpoint.ts";
import { MongoPostFavouriteRepository } from "./post/post-favourite/infrastructure/repositories/MongoPostFavouriteRepository.ts";
import { CreateActivityProposalHistoryEntrie } from "./proposal-history-entrie/activity-proposal-history-entrie/aplication/use-cases/CreateActivityProposalHistoryEntrie.ts";
import { GetAllActivityProposalHistoryEntriesByProposalId } from "./proposal-history-entrie/activity-proposal-history-entrie/aplication/use-cases/GetAllActivityProposalHistoryEntriesByProposalId.ts";
import type { ActivityProposalHistoryEntrieRepository } from "./proposal-history-entrie/activity-proposal-history-entrie/domain/repositories/ActivityProposalHistoryEntrieRepository.ts";
import { CreateActivityProposalHistoryEntrieEndpoint } from "./proposal-history-entrie/activity-proposal-history-entrie/infrastructure/controllers/CreateActivityProposalHistoryEntrieEndpoint.ts";
import { GetAllActivityProposalHistoryEntriesByProposalIdEndpoint } from "./proposal-history-entrie/activity-proposal-history-entrie/infrastructure/controllers/GetAllActivityProposalHistoryEntriesByProposalIdEndpoint.ts";
import { MongoActivityProposalHistoryEntrieRepository } from "./proposal-history-entrie/activity-proposal-history-entrie/infrastructure/repositories/MongoActivityProposalHistoryEntrieRepository.ts";
import { CreateReplyProposalHistoryEntrie } from "./proposal-history-entrie/reply-proposal-history-entrie/aplication/use-cases/CreateReplyProposalHistoryEntrie.ts";
import { GetAllReplyProposalHistoryEntriesByProposalId } from "./proposal-history-entrie/reply-proposal-history-entrie/aplication/use-cases/GetAllReplyProposalHistoryEntrieByProposalId.ts";
import type { ReplyProposalHistoryEntrieRepository } from "./proposal-history-entrie/reply-proposal-history-entrie/domain/repositories/ReplyProposalHistoryEntrieRepository.ts";
import { CreateReplyProposalHistoryEntrieEndpoint } from "./proposal-history-entrie/reply-proposal-history-entrie/infrastructure/controllers/CreateReplyProposalHistoryEntrieEndpoint.ts";
import { GetAllReplyProposalHistoryEntriesByProposalIdEndpoint } from "./proposal-history-entrie/reply-proposal-history-entrie/infrastructure/controllers/GetAllReplyProposalHistoryEntrieByProposalIdEndpoint.ts";
import { MongoReplyProposalHistoryEntrieRepository } from "./proposal-history-entrie/reply-proposal-history-entrie/infrastructure/repositories/MongoReplyProposalHistoryEntrieRepository.ts";
import { ChangeProposalInformation } from "./proposal/application/use-cases/ChangeProposalInformation.ts";
import { ChangeProposalPlay } from "./proposal/application/use-cases/ChangeProposalPlay.ts";
import { CreateProposal } from "./proposal/application/use-cases/CreateProposal.ts";
import { DeleteProposalById } from "./proposal/application/use-cases/DeleteProposalById.ts";
import { GetAllProposalsByPostId } from "./proposal/application/use-cases/GetAllProposalsByPostId.ts";
import { GetAllProposalsByUserId } from "./proposal/application/use-cases/GetAllProposalsByUserId.ts";
import { GetProposalById } from "./proposal/application/use-cases/GetProposalById.ts";
import type { ProposalReadModelRepository } from "./proposal/domain/repositories/ProposalReadModelRepository.ts";
import type { ProposalRepository } from "./proposal/domain/repositories/ProposalRepository.ts";
import { ChangeProposalInformationEndpoint } from "./proposal/infrastructure/controllers/ChangeProposalInformationEndpoint.ts";
import { ChangeProposalPlayEndpoint } from "./proposal/infrastructure/controllers/ChangeProposalPlayEndpoint.ts";
import { CreateProposalEndpoint } from "./proposal/infrastructure/controllers/CreateProposalEndpoint.ts";
import { DeleteProposalByIdEndpoint } from "./proposal/infrastructure/controllers/DeleteProposalByIdEndpoint.ts";
import { GetAllProposalsByPostIdEndpoint } from "./proposal/infrastructure/controllers/GetAllProposalsByPostIdEndpoint.ts";
import { GetAllProposalsByUserIdEndpoint } from "./proposal/infrastructure/controllers/GetAllProposalsByUserIdEndpoint.ts";
import { GetProposalByIdEndpoint } from "./proposal/infrastructure/controllers/GetProposalByIdEndpoint.ts";
import { MongoProposalReadModelRepository } from "./proposal/infrastructure/repositories/MongoProposalReadModelRepository.ts";
import { MongoProposalRepository } from "./proposal/infrastructure/repositories/MongoProposalRepository.ts";
import { createHono } from "./shared/controllers/infrastructure/CreateHono.ts";
import type { PasswordHasherRepository } from "./shared/password-hashing/domain/repositories/PasswordHasherRepository.ts";
import { BcryptPasswordHasherRepository } from "./shared/password-hashing/infrastructure/repositories/BcryptPasswordHasherRepository.ts";
import { MongoModule } from "./shared/persistance/infrastructure/mongo/CreateMongoClient.ts";
import { ChangePassword } from "./user/application/use-cases/ChangePassword.ts";
import { ChangeUsername } from "./user/application/use-cases/ChangeUsername.ts";
import { DeleteUserById } from "./user/application/use-cases/DeleteUserById.ts";
import { GetUserById } from "./user/application/use-cases/GetUserById.ts";
import { LoginUser } from "./user/application/use-cases/LoginUser.ts";
import { RegisterUser } from "./user/application/use-cases/RegisterUser.ts";
import { UpdateUserProfile } from "./user/application/use-cases/UpdateUserProfile.ts";
import type { UserReadModelRepository } from "./user/domain/repositories/UserReadModelRepository.ts";
import type { UserRepository } from "./user/domain/repositories/UserRepository.ts";
import { ChangePasswordEndpoint } from "./user/infrastructure/controllers/ChangePasswordEndpoint.ts";
import { ChangeUsernameEndpoint } from "./user/infrastructure/controllers/ChangeUsernameEndpoint.ts";
import { DeleteUserByIdEndpoint } from "./user/infrastructure/controllers/DeleteUserByIdEndpoint.ts";
import { GetUserByIdEndpoint } from "./user/infrastructure/controllers/GetUserByIdEndpoint.ts";
import { GetUserProfileEndpoint } from "./user/infrastructure/controllers/GetUserProfileEndpoint.ts";
import { LoginUserEnpoint } from "./user/infrastructure/controllers/LoginUserEndpoint.ts";
import { RegisterUserEndpoint } from "./user/infrastructure/controllers/RegisterUserEndpoint.ts";
import { UpdateUserProfileEndpoint } from "./user/infrastructure/controllers/UpdateUserProfileEndpoint.ts";
import { MongoUserReadModelRepository } from "./user/infrastructure/repositories/MongoUserReadModelRepository.ts";
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
  .bind(Token.USER_READ_MODEL_REPOSITORY)
  .toDynamicValue(MongoUserReadModelRepository.create);

container
  .bind(Token.REGISTER_USER)
  .toDynamicValue(async (ctx) => {
    return new RegisterUser(
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
      await ctx.getAsync<PasswordHasherRepository>(
        Token.PASSWORD_HASHING_REPOSITORY,
      ),
    );
  })
  .inSingletonScope();

container
  .bind(Token.LOGIN_USER)
  .toDynamicValue(async (ctx) => {
    return new LoginUser(
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
      await ctx.getAsync<PasswordHasherRepository>(
        Token.PASSWORD_HASHING_REPOSITORY,
      ),
      await ctx.getAsync<TokenRepository>(Token.TOKEN_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_USER_BY_ID)
  .toDynamicValue(async (ctx) => {
    return new GetUserById(
      await ctx.getAsync<UserReadModelRepository>(
        Token.USER_READ_MODEL_REPOSITORY,
      ),
    );
  })
  .inSingletonScope();

container
  .bind(Token.DELETE_USER_BY_ID)
  .toDynamicValue(async (ctx) => {
    return new DeleteUserById(
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.UPDATE_USER_PROFILE)
  .toDynamicValue(async (ctx) => {
    return new UpdateUserProfile(
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.CHANGE_USERNAME)
  .toDynamicValue(async (ctx) => {
    return new ChangeUsername(
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.CHANGE_PASSWORD)
  .toDynamicValue(async (ctx) => {
    return new ChangePassword(
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
      await ctx.getAsync<PasswordHasherRepository>(
        Token.PASSWORD_HASHING_REPOSITORY,
      ),
    );
  })
  .inSingletonScope();

container
  .bind(Token.REFRESH_TOKEN)
  .toDynamicValue(async (ctx) => {
    return new RefreshToken(
      await ctx.getAsync<TokenRepository>(Token.TOKEN_REPOSITORY),
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
      Token.DELETE_USER_BY_ID,
    );
    return DeleteUserByIdEndpoint(deleteUserById);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const updateUserProfile = await ctx.getAsync<UpdateUserProfile>(
      Token.UPDATE_USER_PROFILE,
    );
    return UpdateUserProfileEndpoint(updateUserProfile);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const changeUsername = await ctx.getAsync<ChangeUsername>(
      Token.CHANGE_USERNAME,
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
      Token.CHANGE_PASSWORD,
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
      await ctx.getAsync<DraftRepository>(Token.DRAFT_REPOSITORY),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_DRAFT_BY_ID)
  .toDynamicValue(async (ctx) => {
    return new GetDraftById(
      await ctx.getAsync<DraftRepository>(Token.DRAFT_REPOSITORY),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.DELETE_DRAFT_BY_ID)
  .toDynamicValue(async (ctx) => {
    return new DeleteDraftById(
      await ctx.getAsync<DraftRepository>(Token.DRAFT_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.CHANGE_DRAFT_PLAY)
  .toDynamicValue(async (ctx) => {
    return new ChangeDraftPlay(
      await ctx.getAsync<DraftRepository>(Token.DRAFT_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.CHANGE_DRAFT_INFORMATION)
  .toDynamicValue(async (ctx) => {
    return new ChangeDraftInformation(
      await ctx.getAsync<DraftRepository>(Token.DRAFT_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_ALL_DRAFTS_BY_USER_ID)
  .toDynamicValue(async (ctx) => {
    return new GetAllDraftsByUserId(
      await ctx.getAsync<DraftRepository>(Token.DRAFT_REPOSITORY),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
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
      Token.GET_DRAFT_BY_ID,
    );
    return GetDraftByIdEndpoint(getDraftById);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const deleteDraftById = await ctx.getAsync<DeleteDraftById>(
      Token.DELETE_DRAFT_BY_ID,
    );
    return DeleteDraftByIdEndpoint(deleteDraftById);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const changeDraftPlay = await ctx.getAsync<ChangeDraftPlay>(
      Token.CHANGE_DRAFT_PLAY,
    );
    return ChangeDraftPlayEndpoint(changeDraftPlay);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const changeDraftInformation = await ctx.getAsync<ChangeDraftInformation>(
      Token.CHANGE_DRAFT_INFORMATION,
    );
    return ChangeDraftInformationEndpoint(changeDraftInformation);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getAllDraftsByUserId = await ctx.getAsync<GetAllDraftsByUserId>(
      Token.GET_ALL_DRAFTS_BY_USER_ID,
    );
    return GetAllDraftsByUserEndpoint(getAllDraftsByUserId);
  })
  .inSingletonScope();

// Post
container
  .bind(Token.POST_REPOSITORY)
  .toDynamicValue(MongoPostRepository.create);

container
  .bind(Token.POST_READ_MODEL_REPOSITORY)
  .toDynamicValue(MongoPostReadModelRepository.create);

container
  .bind(Token.POST_FAVOURITE_REPOSITORY)
  .toDynamicValue(MongoPostFavouriteRepository.create);

container
  .bind(Token.CREATE_POST)
  .toDynamicValue(async (ctx) => {
    return new CreatePost(
      await ctx.getAsync<PostRepository>(Token.POST_REPOSITORY),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_POST_BY_ID)
  .toDynamicValue(async (ctx) => {
    return new GetPostById(
      await ctx.getAsync<PostReadModelRepository>(
        Token.POST_READ_MODEL_REPOSITORY,
      ),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_ALL_POSTS_BY_USER_ID)
  .toDynamicValue(async (ctx) => {
    return new GetAllPostsByUserId(
      await ctx.getAsync<PostReadModelRepository>(
        Token.POST_READ_MODEL_REPOSITORY,
      ),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_POSTS_BY_CRITERIA)
  .toDynamicValue(async (ctx) => {
    return new GetPostsByCriteria(
      await ctx.getAsync<PostReadModelRepository>(
        Token.POST_READ_MODEL_REPOSITORY,
      ),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_TRENDING_POST)
  .toDynamicValue(async (ctx) => {
    return new GetTrendingPost(
      await ctx.getAsync<PostReadModelRepository>(
        Token.POST_READ_MODEL_REPOSITORY,
      ),
    );
  })
  .inSingletonScope();

container
  .bind(Token.CHANGE_POST_PLAY)
  .toDynamicValue(async (ctx) => {
    return new ChangePostPlay(
      await ctx.getAsync<PostRepository>(Token.POST_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.CHANGE_POST_INFORMATION)
  .toDynamicValue(async (ctx) => {
    return new ChangePostInformation(
      await ctx.getAsync<PostRepository>(Token.POST_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.DELETE_POST_BY_ID)
  .toDynamicValue(async (ctx) => {
    return new DeletePostById(
      await ctx.getAsync<PostRepository>(Token.POST_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.MARK_POST_AS_FAVOURITE)
  .toDynamicValue(async (ctx) => {
    return new MarkPostAsFavourite(
      await ctx.getAsync<PostFavouriteRepository>(
        Token.POST_FAVOURITE_REPOSITORY,
      ),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
      await ctx.getAsync<PostRepository>(Token.POST_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.UNMARK_POST_AS_FAVOURITE)
  .toDynamicValue(async (ctx) => {
    return new UnmarkPostAsFavourite(
      await ctx.getAsync<PostFavouriteRepository>(
        Token.POST_FAVOURITE_REPOSITORY,
      ),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
      await ctx.getAsync<PostRepository>(Token.POST_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_ALL_FAVOURITES_BY_POST_ID)
  .toDynamicValue(async (ctx) => {
    return new GetAllPostFavouritesByPostId(
      await ctx.getAsync<PostFavouriteRepository>(
        Token.POST_FAVOURITE_REPOSITORY,
      ),
      await ctx.getAsync<PostRepository>(Token.POST_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_ALL_FAVOURITES_BY_USER_ID)
  .toDynamicValue(async (ctx) => {
    return new GetAllPostFavouritesByUserId(
      await ctx.getAsync<PostFavouriteRepository>(
        Token.POST_FAVOURITE_REPOSITORY,
      ),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.USER_HAS_LIKED_POST)
  .toDynamicValue(async (ctx) => {
    return new UserHasLikedPost(
      await ctx.getAsync<PostFavouriteRepository>(
        Token.POST_FAVOURITE_REPOSITORY,
      ),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
      await ctx.getAsync<PostRepository>(Token.POST_REPOSITORY),
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
      Token.GET_ALL_POSTS_BY_USER_ID,
    );
    return GetAllPostsByUserIdEndpoint(getAllPostsByUserId);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getPostsByCriteria = await ctx.getAsync<GetPostsByCriteria>(
      Token.GET_POSTS_BY_CRITERIA,
    );
    return GetPostsByCriteriaEnpoint(getPostsByCriteria);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const changePostPlay = await ctx.getAsync<ChangePostPlay>(
      Token.CHANGE_POST_PLAY,
    );
    return ChangePostPlayEndpoint(changePostPlay);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const changePostInformation = await ctx.getAsync<ChangePostInformation>(
      Token.CHANGE_POST_INFORMATION,
    );
    return ChangePostInformationEndpoint(changePostInformation);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const deletePostById = await ctx.getAsync<DeletePostById>(
      Token.DELETE_POST_BY_ID,
    );
    return DeletePostByIdEndpoint(deletePostById);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const markPostAsFavourite = await ctx.getAsync<MarkPostAsFavourite>(
      Token.MARK_POST_AS_FAVOURITE,
    );
    return MarkPostAsFavouriteEndpoint(markPostAsFavourite);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const unmarkPostAsFavourite = await ctx.getAsync<UnmarkPostAsFavourite>(
      Token.UNMARK_POST_AS_FAVOURITE,
    );
    return UnmarkPostAsFavouriteEndpoint(unmarkPostAsFavourite);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getAllFavouritesByPostId =
      await ctx.getAsync<GetAllPostFavouritesByPostId>(
        Token.GET_ALL_FAVOURITES_BY_POST_ID,
      );
    return GetAllFavouritesByPostIdEndpoint(getAllFavouritesByPostId);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getAllFavouritesByUserId =
      await ctx.getAsync<GetAllPostFavouritesByUserId>(
        Token.GET_ALL_FAVOURITES_BY_USER_ID,
      );
    return GetAllFavouritesByUserIdEndpoint(getAllFavouritesByUserId);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getTrendingPost = await ctx.getAsync<GetTrendingPost>(
      Token.GET_TRENDING_POST,
    );
    return GetTrendingPostEndpoint(getTrendingPost);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const userHasLikedPost = await ctx.getAsync<UserHasLikedPost>(
      Token.USER_HAS_LIKED_POST,
    );
    return UserHasLikedPostEndpoint(userHasLikedPost);
  })
  .inSingletonScope();

// COMMENT
container
  .bind(Token.COMMENT_REPOSITORY)
  .toDynamicValue(MongoCommentRepository.create);

container
  .bind(Token.COMMENT_FAVOURITE_REPOSITORY)
  .toDynamicValue(MongoCommentFavouriteRepository.create);

container
  .bind(Token.CREATE_COMMENT)
  .toDynamicValue(async (ctx) => {
    return new CreateComment(
      await ctx.getAsync<CommentRepository>(Token.COMMENT_REPOSITORY),
      await ctx.getAsync<PostRepository>(Token.POST_REPOSITORY),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.DELETE_COMMENT_BY_ID)
  .toDynamicValue(async (ctx) => {
    return new DeleteCommentById(
      await ctx.getAsync<CommentRepository>(Token.COMMENT_REPOSITORY),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
      await ctx.getAsync<PostRepository>(Token.POST_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_ALL_COMMENTS_BY_POST_ID)
  .toDynamicValue(async (ctx) => {
    return new GetAllCommentsByPostId(
      await ctx.getAsync<CommentRepository>(Token.COMMENT_REPOSITORY),
      await ctx.getAsync<PostRepository>(Token.POST_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_COMMENT_BY_ID)
  .toDynamicValue(async (ctx) => {
    return new GetCommentById(
      await ctx.getAsync<CommentRepository>(Token.COMMENT_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.REPLY_COMMENT)
  .toDynamicValue(async (ctx) => {
    return new ReplyComment(
      await ctx.getAsync<CommentRepository>(Token.COMMENT_REPOSITORY),
      await ctx.getAsync<PostRepository>(Token.POST_REPOSITORY),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.MARK_COMMENT_AS_FAVOURITE)
  .toDynamicValue(async (ctx) => {
    return new MarkCommentAsFavourite(
      await ctx.getAsync<CommentFavouriteRepository>(
        Token.COMMENT_FAVOURITE_REPOSITORY,
      ),
      await ctx.getAsync<CommentRepository>(Token.COMMENT_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.UNMARK_COMMENT_AS_FAVOURITE)
  .toDynamicValue(async (ctx) => {
    return new UnmarkCommentAsFavourite(
      await ctx.getAsync<CommentFavouriteRepository>(
        Token.COMMENT_FAVOURITE_REPOSITORY,
      ),
      await ctx.getAsync<CommentRepository>(Token.COMMENT_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_ALL_COMMENT_FAVOURITES_BY_COMMENT_ID)
  .toDynamicValue(async (ctx) => {
    return new GetAllCommentFavouritesByCommentId(
      await ctx.getAsync<CommentFavouriteRepository>(
        Token.COMMENT_FAVOURITE_REPOSITORY,
      ),
      await ctx.getAsync<CommentRepository>(Token.COMMENT_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const createComment = await ctx.getAsync<CreateComment>(
      Token.CREATE_COMMENT,
    );
    return CreateCommentEndpoint(createComment);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const deleteCommentById = await ctx.getAsync<DeleteCommentById>(
      Token.DELETE_COMMENT_BY_ID,
    );
    return DeleteCommentByIdEndpoint(deleteCommentById);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getAllCommentsByPostId = await ctx.getAsync<GetAllCommentsByPostId>(
      Token.GET_ALL_COMMENTS_BY_POST_ID,
    );
    return GetAllCommentsByPostIdEndpoint(getAllCommentsByPostId);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getCommentById = await ctx.getAsync<GetCommentById>(
      Token.GET_COMMENT_BY_ID,
    );
    return GetCommentByIdEndpoint(getCommentById);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const replyComment = await ctx.getAsync<ReplyComment>(Token.REPLY_COMMENT);
    return ReplyCommentEndpoint(replyComment);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const markCommentAsFavourite = await ctx.getAsync<MarkCommentAsFavourite>(
      Token.MARK_COMMENT_AS_FAVOURITE,
    );
    return MarkCommentAsFavouriteEndpoint(markCommentAsFavourite);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const unmarkCommentAsFavourite =
      await ctx.getAsync<UnmarkCommentAsFavourite>(
        Token.UNMARK_COMMENT_AS_FAVOURITE,
      );
    return UnmarkCommentAsFavouriteEndpoint(unmarkCommentAsFavourite);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getAllCommentFavouritesByCommentId =
      await ctx.getAsync<GetAllCommentFavouritesByCommentId>(
        Token.GET_ALL_COMMENT_FAVOURITES_BY_COMMENT_ID,
      );
    return GetAllCommentFavouritesByCommentIdEndpoint(
      getAllCommentFavouritesByCommentId,
    );
  })
  .inSingletonScope();

// Proposal
container
  .bind(Token.PROPOSAL_REPOSITORY)
  .toDynamicValue(MongoProposalRepository.create);

container
  .bind(Token.PROPOSAL_READ_MODEL_REPOSITORY)
  .toDynamicValue(MongoProposalReadModelRepository.create);

container
  .bind(Token.ACTIVITY_PROPOSAL_HISTORY_ENTRIE_REPOSITORY)
  .toDynamicValue(MongoActivityProposalHistoryEntrieRepository.create);

container
  .bind(Token.REPLY_PROPOSAL_HISTORY_ENTRIE_REPOSITORY)
  .toDynamicValue(MongoReplyProposalHistoryEntrieRepository.create);

container
  .bind(Token.CREATE_PROPOSAL)
  .toDynamicValue(async (ctx) => {
    return new CreateProposal(
      await ctx.getAsync<ProposalRepository>(Token.PROPOSAL_REPOSITORY),
      await ctx.getAsync<PostRepository>(Token.POST_REPOSITORY),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.DELETE_PROPOSAL_BY_ID)
  .toDynamicValue(async (ctx) => {
    return new DeleteProposalById(
      await ctx.getAsync<ProposalRepository>(Token.PROPOSAL_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_PROPOSAL_BY_ID)
  .toDynamicValue(async (ctx) => {
    return new GetProposalById(
      await ctx.getAsync<ProposalReadModelRepository>(
        Token.PROPOSAL_READ_MODEL_REPOSITORY,
      ),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_ALL_PROPOSALS_BY_POST_ID)
  .toDynamicValue(async (ctx) => {
    return new GetAllProposalsByPostId(
      await ctx.getAsync<ProposalReadModelRepository>(
        Token.PROPOSAL_READ_MODEL_REPOSITORY,
      ),
      await ctx.getAsync<PostRepository>(Token.POST_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_ALL_PROPOSALS_BY_USER_ID)
  .toDynamicValue(async (ctx) => {
    return new GetAllProposalsByUserId(
      await ctx.getAsync<ProposalReadModelRepository>(
        Token.PROPOSAL_READ_MODEL_REPOSITORY,
      ),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.CHANGE_PROPOSAL_PLAY)
  .toDynamicValue(async (ctx) => {
    return new ChangeProposalPlay(
      await ctx.getAsync<ProposalRepository>(Token.PROPOSAL_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.CHANGE_PROPOSAL_INFORMATION)
  .toDynamicValue(async (ctx) => {
    return new ChangeProposalInformation(
      await ctx.getAsync<ProposalRepository>(Token.PROPOSAL_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.CREATE_ACTIVITY_PROPOSAL_HISTORY_ENTRIE)
  .toDynamicValue(async (ctx) => {
    return new CreateActivityProposalHistoryEntrie(
      await ctx.getAsync<ActivityProposalHistoryEntrieRepository>(
        Token.ACTIVITY_PROPOSAL_HISTORY_ENTRIE_REPOSITORY,
      ),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
      await ctx.getAsync<ProposalRepository>(Token.PROPOSAL_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_ALL_ACTIVITY_PROPOSAL_HISTORY_ENTRIES_BY_PROPOSAL_ID)
  .toDynamicValue(async (ctx) => {
    return new GetAllActivityProposalHistoryEntriesByProposalId(
      await ctx.getAsync<ActivityProposalHistoryEntrieRepository>(
        Token.ACTIVITY_PROPOSAL_HISTORY_ENTRIE_REPOSITORY,
      ),
      await ctx.getAsync<ProposalRepository>(Token.PROPOSAL_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.CREATE_REPLY_PROPOSAL_HISTORY_ENTRIE)
  .toDynamicValue(async (ctx) => {
    return new CreateReplyProposalHistoryEntrie(
      await ctx.getAsync<ReplyProposalHistoryEntrieRepository>(
        Token.REPLY_PROPOSAL_HISTORY_ENTRIE_REPOSITORY,
      ),
      await ctx.getAsync<UserRepository>(Token.USER_REPOSITORY),
      await ctx.getAsync<ProposalRepository>(Token.PROPOSAL_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.GET_ALL_REPLY_PROPOSAL_HISTORY_ENTRIES_BY_PROPOSAL_ID)
  .toDynamicValue(async (ctx) => {
    return new GetAllReplyProposalHistoryEntriesByProposalId(
      await ctx.getAsync<ReplyProposalHistoryEntrieRepository>(
        Token.REPLY_PROPOSAL_HISTORY_ENTRIE_REPOSITORY,
      ),
      await ctx.getAsync<ProposalRepository>(Token.PROPOSAL_REPOSITORY),
    );
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const createProposal = await ctx.getAsync<CreateProposal>(
      Token.CREATE_PROPOSAL,
    );
    return CreateProposalEndpoint(createProposal);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const deleteProposalById = await ctx.getAsync<DeleteProposalById>(
      Token.DELETE_PROPOSAL_BY_ID,
    );
    return DeleteProposalByIdEndpoint(deleteProposalById);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getProposalById = await ctx.getAsync<GetProposalById>(
      Token.GET_PROPOSAL_BY_ID,
    );
    return GetProposalByIdEndpoint(getProposalById);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getAllProposalsByPostId = await ctx.getAsync<GetAllProposalsByPostId>(
      Token.GET_ALL_PROPOSALS_BY_POST_ID,
    );
    return GetAllProposalsByPostIdEndpoint(getAllProposalsByPostId);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getAllProposalsByUserId = await ctx.getAsync<GetAllProposalsByUserId>(
      Token.GET_ALL_PROPOSALS_BY_USER_ID,
    );
    return GetAllProposalsByUserIdEndpoint(getAllProposalsByUserId);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const changeProposalPlay = await ctx.getAsync<ChangeProposalPlay>(
      Token.CHANGE_PROPOSAL_PLAY,
    );
    return ChangeProposalPlayEndpoint(changeProposalPlay);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const changeProposalInformation =
      await ctx.getAsync<ChangeProposalInformation>(
        Token.CHANGE_PROPOSAL_INFORMATION,
      );
    return ChangeProposalInformationEndpoint(changeProposalInformation);
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const createActivityProposalHistoryEntrie =
      await ctx.getAsync<CreateActivityProposalHistoryEntrie>(
        Token.CREATE_ACTIVITY_PROPOSAL_HISTORY_ENTRIE,
      );
    return CreateActivityProposalHistoryEntrieEndpoint(
      createActivityProposalHistoryEntrie,
    );
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getAllActivityProposalHistoryEntriesByProposalId =
      await ctx.getAsync<GetAllActivityProposalHistoryEntriesByProposalId>(
        Token.GET_ALL_ACTIVITY_PROPOSAL_HISTORY_ENTRIES_BY_PROPOSAL_ID,
      );
    return GetAllActivityProposalHistoryEntriesByProposalIdEndpoint(
      getAllActivityProposalHistoryEntriesByProposalId,
    );
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const createReplyProposalHistoryEntrie =
      await ctx.getAsync<CreateReplyProposalHistoryEntrie>(
        Token.CREATE_REPLY_PROPOSAL_HISTORY_ENTRIE,
      );
    return CreateReplyProposalHistoryEntrieEndpoint(
      createReplyProposalHistoryEntrie,
    );
  })
  .inSingletonScope();

container
  .bind(Token.ENDPOINT)
  .toDynamicValue(async (ctx) => {
    const getAllReplyProposalHistoryEntriesByProposalId =
      await ctx.getAsync<GetAllReplyProposalHistoryEntriesByProposalId>(
        Token.GET_ALL_REPLY_PROPOSAL_HISTORY_ENTRIES_BY_PROPOSAL_ID,
      );
    return GetAllReplyProposalHistoryEntriesByProposalIdEndpoint(
      getAllReplyProposalHistoryEntriesByProposalId,
    );
  })
  .inSingletonScope();

// App
container.bind(Token.APP).toDynamicValue(createHono).inSingletonScope();
