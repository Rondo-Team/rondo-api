import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import type { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { DraftRepository } from "../../domain/repositories/DraftRepository.ts";
import { DraftFinder } from "../../domain/services/DraftFinder.ts";
import { DraftId } from "../../domain/value-objects/DraftId.ts";

export class DeleteDraftById {
  private draftRepository: DraftRepository;
  private draftFinder: DraftFinder;
  private resourceAccessChecker: ResourceAccessChecker;
  private userRepository: UserRepository;
  private userFinder: UserFinder;

  constructor(
    draftRepository: DraftRepository,
    userRepository: UserRepository,
  ) {
    this.draftRepository = draftRepository;
    this.userRepository = userRepository;
    this.draftFinder = new DraftFinder(draftRepository);
    this.userFinder = new UserFinder(userRepository);
    this.resourceAccessChecker = new ResourceAccessChecker();
  }

  async run(id: string, actorId: string) {
    const draftId = DraftId.fromPrimitives(id);
    const actorUserId = UserId.fromPrimitives(actorId);

    const draft = await this.draftFinder.findById(draftId);
    await this.resourceAccessChecker.check(actorUserId, draft.userId);

    const user = await this.userFinder.findById(actorUserId);
    user.deleteDraft(draftId);
    await this.userRepository.edit(user);

    return this.draftRepository.deleteById(draftId);
  }
}
