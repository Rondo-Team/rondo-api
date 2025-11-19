import { HashedPassword } from "@/shared/password-hashing/domain/value-objects/HashedPassword";
import { UserCommentsCount } from "@/User/domain/value-objects/UserCommentsCount";
import { UserCreatedAt } from "@/User/domain/value-objects/UserCreatedAt";
import { UserEmail } from "@/User/domain/value-objects/UserEmail";
import { UserFavouritePostsCount } from "@/User/domain/value-objects/UserFavouritePostsCount";
import { UserId } from "@/User/domain/value-objects/UserId";
import { UserName } from "@/User/domain/value-objects/UserName";
import { UserPostsCount } from "@/User/domain/value-objects/UserPostsCount";
import { UserProfilePicture } from "@/User/domain/value-objects/UserProfilePicture";
import { UserProposalsCount } from "@/User/domain/value-objects/UserProposalsCount";
import { UserUsername } from "@/User/domain/value-objects/UserUsername";

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

  changeProfilePicture(profilePicture: UserProfilePicture) {
    this.profilePicture = profilePicture
  }
}
