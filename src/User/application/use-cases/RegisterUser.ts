import { PasswordHasherRepository } from "../../../shared/services/bcrypt/domain/repositories/PasswordHasherRepository";
import { HashedPassword } from "../../../shared/services/bcrypt/domain/value-objects/HashedPassword";
import { PlainPassword } from "../../../shared/services/bcrypt/domain/value-objects/PlainPassword";
import { UserWithEmailAlreadyExistsError } from "../../domain/errors/UserWithEmailAlreadyExistsError";
import { UserWithIdAlreadyExistsError } from "../../domain/errors/UserWithIdAlreadyExistsError";
import { UserWithUsernameAlreadyExistsError } from "../../domain/errors/UserWithUsernameAlreadyExistsError";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/User";
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
  constructor(
    private UserRepository: UserRepository,
    private PasswordHasherRepository: PasswordHasherRepository
  ) {}

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
    // Ensure we are hashing the password.
    const plainPassword = new PlainPassword(password);
    const hashedPassword = await this.PasswordHasherRepository.hash(
      plainPassword.toPrimitives()
    );

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
    await this.ensureIdIsNotUsed(id);
    await this.ensureEmailIsNotUsed(email);
    await this.ensureUsernameIsNotUsed(username)

    return await this.UserRepository.create(user);
  }

  private async ensureIdIsNotUsed(id: string) {
    if (await this.UserRepository.existsWithId(UserId.fromPrimitives(id)))
      throw new UserWithIdAlreadyExistsError(id);
  }

  private async ensureEmailIsNotUsed(email: string) {
    if (
      await this.UserRepository.existsWithEmail(UserEmail.fromPrimitives(email))
    )
      throw new UserWithEmailAlreadyExistsError(email);
  }

  private async ensureUsernameIsNotUsed(username: string) {
    if (
      await this.UserRepository.existsWithUsername(
        UserUsername.fromPrimitives(username)
      )
    )
      throw new UserWithUsernameAlreadyExistsError(username);
  }
}
