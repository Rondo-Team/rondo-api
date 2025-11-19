import { PasswordHasherRepository } from "@/shared/password-hashing/domain/repositories/PasswordHasherRepository";
import { HashedPassword } from "@/shared/password-hashing/domain/value-objects/HashedPassword";
import { PlainPassword } from "@/shared/password-hashing/domain/value-objects/PlainPassword";
import { UserRepository } from "@/User/domain/repositories/UserRepository";
import { UserUniquenessChecker } from "@/User/domain/services/UserUniquenessChecker";
import { User } from "@/User/domain/User";
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

export class RegisterUser {
  private readonly userUniquenessChecker: UserUniquenessChecker;
  constructor(
    private userRepository: UserRepository,
    private passwordHasherRepository: PasswordHasherRepository
  ) {
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
    createdAt: Date
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
      new UserCreatedAt(createdAt)
    );

    // Ensure username and email dont exist already.
    await this.userUniquenessChecker.ensureIdIsNotUsed(id);
    await this.userUniquenessChecker.ensureEmailIsNotUsed(email);
    await this.userUniquenessChecker.ensureUsernameIsNotUsed(username);

    return this.userRepository.create(user);
  }
}
