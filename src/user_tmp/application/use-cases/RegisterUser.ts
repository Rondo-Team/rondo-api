import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { PasswordHasherRepository } from "@/shared/password-hashing/domain/repositories/PasswordHasherRepository";
import { HashedPassword } from "@/shared/password-hashing/domain/value-objects/HashedPassword";
import { PlainPassword } from "@/shared/password-hashing/domain/value-objects/PlainPassword";
import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserUniquenessChecker } from "@/user/domain/services/UserUniquenessChecker";
import { User } from "@/user/domain/User";
import { UserCommentsCount } from "@/user/domain/value-objects/UserCommentsCount";
import { UserEmail } from "@/user/domain/value-objects/UserEmail";
import { UserFavouritePostsCount } from "@/user/domain/value-objects/UserFavouritePostsCount";
import { UserId } from "@/user/domain/value-objects/UserId";
import { UserName } from "@/user/domain/value-objects/UserName";
import { UserPostsCount } from "@/user/domain/value-objects/UserPostsCount";
import { UserProfilePicture } from "@/user/domain/value-objects/UserProfilePicture";
import { UserProposalsCount } from "@/user/domain/value-objects/UserProposalsCount";
import { UserUsername } from "@/user/domain/value-objects/UserUsername";

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
      new CreatedAt(createdAt)
    );

    // Ensure username and email dont exist already.
    await this.userUniquenessChecker.ensureIdIsNotUsed(new UserId(id));
    await this.userUniquenessChecker.ensureEmailIsNotUsed(new UserEmail(email));
    await this.userUniquenessChecker.ensureUsernameIsNotUsed(new UserUsername(username));

    return this.userRepository.create(user);
  }
}
