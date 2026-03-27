import type { UserProfileReadModel } from "../../domain/read-model/UserProfileReadModel.ts";
import type { UserReadModelRepository } from "../../domain/repositories/UserReadModelRepository.ts";
import { UserId } from "../../domain/value-objects/UserId.ts";

export class GetUserById {
  private readonly userReadModelRepository: UserReadModelRepository;
  constructor(userReadModelRepository: UserReadModelRepository) {
    this.userReadModelRepository = userReadModelRepository;
  }

  async run(id: string): Promise<UserProfileReadModel | undefined> {
    return this.userReadModelRepository.getOneById(UserId.fromPrimitives(id));
  }
}
