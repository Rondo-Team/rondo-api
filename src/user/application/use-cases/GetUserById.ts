import { UserNotFoundByIdError } from "../../domain/errors/UserNotFoundByIdError.ts";
import type { UserProfileReadModel } from "../../domain/read-model/UserProfileReadModel.ts";
import type { UserReadModelRepository } from "../../domain/repositories/UserReadModelRepository.ts";
import { UserId } from "../../domain/value-objects/UserId.ts";

export class GetUserById {
  private readonly userReadModelRepository: UserReadModelRepository;
  constructor(userReadModelRepository: UserReadModelRepository) {
    this.userReadModelRepository = userReadModelRepository;
  }

  async run(id: string): Promise<UserProfileReadModel | undefined> {
    const user = await this.userReadModelRepository.getOneById(
      UserId.fromPrimitives(id),
    );
    if (!user) throw new UserNotFoundByIdError(id);
    return user;
  }
}
