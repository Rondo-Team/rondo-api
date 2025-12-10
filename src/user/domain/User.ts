import type { Primitives } from "../../shared/domain/types/Primitives.ts";
import { CreatedAt } from "../../shared/domain/value-objects/CreatedAt.ts";
import { HashedPassword } from "../../shared/password-hashing/domain/value-objects/HashedPassword.ts";
import { UserCommentsCount } from "./value-objects/UserCommentsCount.ts";
import { UserEmail } from "./value-objects/UserEmail.ts";
import { UserFavouritePostsCount } from "./value-objects/UserFavouritePostsCount.ts";
import { UserId } from "./value-objects/UserId.ts";
import { UserName } from "./value-objects/UserName.ts";
import { UserPostsCount } from "./value-objects/UserPostsCount.ts";
import { UserProfilePicture } from "./value-objects/UserProfilePicture.ts";
import { UserProposalsCount } from "./value-objects/UserProposalsCount.ts";
import { UserUsername } from "./value-objects/UserUsername.ts";

export type UserPrimitives = Primitives<User>;

export class User {
  id: UserId;
  email: UserEmail;
  username: UserUsername;
  name: UserName;
  profilePicture: UserProfilePicture;
  password: HashedPassword;
  postsCount: UserPostsCount;
  proposalsCount: UserProposalsCount;
  favouritePostsCount: UserFavouritePostsCount;
  commentsCount: UserCommentsCount;
  createdAt: CreatedAt;

  constructor(
    id: UserId,
    email: UserEmail,
    username: UserUsername,
    name: UserName,
    profilePicture: UserProfilePicture,
    password: HashedPassword,
    postsCount: UserPostsCount,
    proposalsCount: UserProposalsCount,
    favouritePostsCount: UserFavouritePostsCount,
    commentsCount: UserCommentsCount,
    createdAt: CreatedAt
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.name = name;
    this.profilePicture = profilePicture;
    this.password = password;
    this.postsCount = postsCount;
    this.proposalsCount = proposalsCount;
    this.favouritePostsCount = favouritePostsCount;
    this.commentsCount = commentsCount;
    this.createdAt = createdAt;
  }

  toPrimitives() {
    return {
      id: this.id.toPrimitives(),
      email: this.email.toPrimitives(),
      username: this.username.toPrimitives(),
      name: this.name.toPrimitives(),
      profilePicture: this.profilePicture.toPrimitives(),
      password: this.password.toPrimitives(),
      ////////////
      postsCount: this.postsCount.toPrimitives(),
      proposalsCount: this.proposalsCount.toPrimitives(),
      favouritePostsCount: this.favouritePostsCount.toPrimitives(),
      commentsCount: this.commentsCount.toPrimitives(),
      createdAt: this.createdAt.toPrimitives(),
    };
  }

  static fromPrimitives(user: UserPrimitives): User {
    return new User(
      UserId.fromPrimitives(user.id),
      UserEmail.fromPrimitives(user.email),
      UserUsername.fromPrimitives(user.username),
      UserName.fromPrimitives(user.name),
      UserProfilePicture.fromPrimitives(user.profilePicture),
      HashedPassword.fromPrimitives(user.password),
      UserPostsCount.fromPrimitives(user.postsCount),
      UserProposalsCount.fromPrimitives(user.proposalsCount),
      UserFavouritePostsCount.fromPrimitives(user.favouritePostsCount),
      UserCommentsCount.fromPrimitives(user.commentsCount),
      CreatedAt.fromPrimitives(user.createdAt)
    )
  }

  changeEmail(email: UserEmail) {
    this.email = email;
  }

  changeName(name: UserName) {
    this.name = name;
  }

  changeUsername(username: UserUsername) {
    this.username = username;
  }

  changePassword(password: HashedPassword) {
    this.password = password;
  }

  changeProfilePicture(profilePicture: UserProfilePicture) {
    this.profilePicture = profilePicture;
  }

  addPost() {
    this.postsCount = new UserPostsCount(this.postsCount.toPrimitives() + 1);
  }

  addComment() {
    this.commentsCount = new UserCommentsCount(
      this.commentsCount.toPrimitives() + 1
    );
  }

  addFavourite() {
    this.favouritePostsCount = new UserFavouritePostsCount(
      this.favouritePostsCount.toPrimitives() + 1
    );
  }

  addProposal() {
    this.proposalsCount = new UserProposalsCount(
      this.proposalsCount.toPrimitives() + 1
    );
  }
}
