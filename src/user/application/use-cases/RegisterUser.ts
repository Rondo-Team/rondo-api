import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import type { PasswordHasherRepository } from "../../../shared/password-hashing/domain/repositories/PasswordHasherRepository.ts";
import { HashedPassword } from "../../../shared/password-hashing/domain/value-objects/HashedPassword.ts";
import { PlainPassword } from "../../../shared/password-hashing/domain/value-objects/PlainPassword.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { UserUniquenessChecker } from "../../domain/services/UserUniquenessChecker.ts";
import { User } from "../../domain/User.ts";
import { UserCommentsCount } from "../../domain/value-objects/UserCommentsCount.ts";
import { UserEmail } from "../../domain/value-objects/UserEmail.ts";
import { UserFavouritePostsCount } from "../../domain/value-objects/UserFavouritePostsCount.ts";
import { UserId } from "../../domain/value-objects/UserId.ts";
import { UserName } from "../../domain/value-objects/UserName.ts";
import { UserPostsCount } from "../../domain/value-objects/UserPostsCount.ts";
import { UserProfilePicture } from "../../domain/value-objects/UserProfilePicture.ts";
import { UserProposalsCount } from "../../domain/value-objects/UserProposalsCount.ts";
import { UserUsername } from "../../domain/value-objects/UserUsername.ts";
import { UserUsernameChangedAt } from "../../domain/value-objects/UserUsernameChangedAt.ts";

export class RegisterUser {
  private userRepository: UserRepository;
  private passwordHasherRepository: PasswordHasherRepository;
  private readonly userUniquenessChecker: UserUniquenessChecker;
  constructor(
    userRepository: UserRepository,
    passwordHasherRepository: PasswordHasherRepository
  ) {
    this.userRepository = userRepository;
    this.passwordHasherRepository = passwordHasherRepository;
    this.userUniquenessChecker = new UserUniquenessChecker(userRepository);
  }

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
    createdAt: Date,
    usernameChangedAt: Date
  ): Promise<void> {
    // Ensure we are hashing the password.
    const plainPassword = new PlainPassword(password);
    const hashedPassword = await this.passwordHasherRepository.hash(
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
      new CreatedAt(createdAt),
      new UserUsernameChangedAt(usernameChangedAt)
    );

    // Ensure username and email dont exist already.
    await this.userUniquenessChecker.ensureIdIsNotUsed(new UserId(id));
    await this.userUniquenessChecker.ensureEmailIsNotUsed(new UserEmail(email));
    await this.userUniquenessChecker.ensureUsernameIsNotUsed(
      new UserUsername(username)
    );

    return this.userRepository.create(user);
  }
}
