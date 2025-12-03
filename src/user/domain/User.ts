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
