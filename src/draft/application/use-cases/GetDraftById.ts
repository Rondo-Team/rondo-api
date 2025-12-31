import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { type DraftRepository } from "../../domain/repositories/DraftRepository.ts";
import { DraftFinder } from "../../domain/services/DraftFinder.ts";
import { DraftId } from "../../domain/value-objects/DraftId.ts";

export class GetDraftById {
  private draftFinder: DraftFinder;
  private resourceAccessChecker: ResourceAccessChecker;
  constructor(draftRepository: DraftRepository) {
    this.draftFinder = new DraftFinder(draftRepository);
    this.resourceAccessChecker = new ResourceAccessChecker();
  }

  async run(draftId: string, actorId: string) {
    const draft = await this.draftFinder.findById(new DraftId(draftId));
    await this.resourceAccessChecker.check(
      UserId.fromPrimitives(actorId),
      draft.userId
    );
    // If draft is owned by actor, then return it
    return draft;
  }
}
