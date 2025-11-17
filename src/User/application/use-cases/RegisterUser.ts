import { PasswordHasherRepository } from "../../domain/repositories/PasswordHasherRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/User";
import { HashedPassword } from "../../domain/value-objects/HashedPassword";
import { PlainPassword } from "../../domain/value-objects/PlainPassword";
import { UserCommentsCount } from "../../domain/value-objects/UserCommentsCount";
import { UserCreatedAt } from "../../domain/value-objects/UserCreatedAt";
import { UserEmail } from "../../domain/value-objects/UserEmail";
import { UserFavouritePostsCount } from "../../domain/value-objects/UserFavouritePostsCount";
import { UserId } from "../../domain/value-objects/UserId";
import { UserName } from "../../domain/value-objects/UserName";
import { UserPostsCount } from "../../domain/value-objects/UserPostsCount";
import { UserProfilePicture } from "../../domain/value-objects/UserProfilePicture";
import { UserProposalsCount } from "../../domain/value-objects/UserProposalsCount";
import { UserUsername } from "../../domain/value-objects/UserUsername";

export class RegisterUser {
  constructor(private UserRepository: UserRepository, private PasswordHasherRepository: PasswordHasherRepository) {}

  async run(
    id: string,
    email: string,
    username: string,
    name: string,
    profilePicture: string,
    password: string,
    postsCount: number,
    proposalsCount: number,
    favouritePostsCount: number,
    commentsCount: number,
    createdAt: Date
  ): Promise<void> {

    // Ensure we are hashing the password. Could be a try catch
    const plainPassword = new PlainPassword(password)
    const hashedPassword = await this.PasswordHasherRepository.hash(plainPassword.toPrimitives())

    const user = new User(
      new UserId(id),
      new UserEmail(email),
      new UserUsername(username),
      new UserName(name),
      new UserProfilePicture(profilePicture),
      new HashedPassword(hashedPassword),
      new UserPostsCount(postsCount),
      new UserProposalsCount(proposalsCount),
      new UserFavouritePostsCount(favouritePostsCount),
      new UserCommentsCount(commentsCount),
      new UserCreatedAt(createdAt)
    );
    // Ensure username and email dont exist already.

    return this.UserRepository.create(user);
  }
}
