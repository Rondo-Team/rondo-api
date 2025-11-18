import { HashedPassword } from "../../shared/password-hashing/domain/value-objects/HashedPassword";
import { UserCommentsCount } from "./value-objects/UserCommentsCount";
import { UserCreatedAt } from "./value-objects/UserCreatedAt";
import { UserEmail } from "./value-objects/UserEmail";
import { UserFavouritePostsCount } from "./value-objects/UserFavouritePostsCount";
import { UserId } from "./value-objects/UserId";
import { UserName } from "./value-objects/UserName";
import { UserPostsCount } from "./value-objects/UserPostsCount";
import { UserProfilePicture } from "./value-objects/UserProfilePicture";
import { UserProposalsCount } from "./value-objects/UserProposalsCount";
import { UserUsername } from "./value-objects/UserUsername";

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
  createdAt: UserCreatedAt;

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
    createdAt: UserCreatedAt
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
}
