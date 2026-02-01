import type { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { type DraftRepository } from "../../domain/repositories/DraftRepository.ts";

export class GetAllDraftsByUserId {
  private draftRepository: DraftRepository;
  private userFinder: UserFinder;
  constructor(
    draftRepository: DraftRepository,
    userRepository: UserRepository
  ) {
    this.draftRepository = draftRepository;
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string) {
    const userId = UserId.fromPrimitives(id);
    await this.userFinder.findById(userId);

    return this.draftRepository.getAllByUserId(userId);
  }
}
