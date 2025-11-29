import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { HashedPassword } from "@/shared/password-hashing/domain/value-objects/HashedPassword";
import { UserCommentsCount } from "@/user/domain/value-objects/UserCommentsCount";
import { UserEmail } from "@/user/domain/value-objects/UserEmail";
import { UserFavouritePostsCount } from "@/user/domain/value-objects/UserFavouritePostsCount";
import { UserId } from "@/user/domain/value-objects/UserId";
import { UserName } from "@/user/domain/value-objects/UserName";
import { UserPostsCount } from "@/user/domain/value-objects/UserPostsCount";
import { UserProfilePicture } from "@/user/domain/value-objects/UserProfilePicture";
import { UserProposalsCount } from "@/user/domain/value-objects/UserProposalsCount";
import { UserUsername } from "@/user/domain/value-objects/UserUsername";

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
    )
  }
}
