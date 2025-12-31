import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { DraftRepository } from "../../domain/repositories/DraftRepository.ts";
import { DraftFinder } from "../../domain/services/DraftFinder.ts";
import { DraftId } from "../../domain/value-objects/DraftId.ts";

export class DeleteDraftById {
  private draftRepository: DraftRepository;
  private draftFinder: DraftFinder;
  private resourceAccessChecker: ResourceAccessChecker;

  constructor(draftRepository: DraftRepository) {
    this.draftRepository = draftRepository;
    this.draftFinder = new DraftFinder(draftRepository);
    this.resourceAccessChecker = new ResourceAccessChecker();
  }

  async run(id: string, actorId: string) {
    const draftId = DraftId.fromPrimitives(id);
    const draft = await this.draftFinder.findById(draftId);

    await this.resourceAccessChecker.check(
      UserId.fromPrimitives(actorId),
      draft.userId
    );
    
    return this.draftRepository.deleteById(draftId);
  }
}
