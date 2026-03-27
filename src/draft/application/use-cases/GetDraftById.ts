import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import { RecentlyViewedItemType } from "../../../shared/domain/types/RecentlyViewedItemType.ts";
import { RecentlyViewedItem } from "../../../shared/domain/value-objects/RecentlyViewedItem.ts";
import type { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { type DraftRepository } from "../../domain/repositories/DraftRepository.ts";
import { DraftFinder } from "../../domain/services/DraftFinder.ts";
import { DraftId } from "../../domain/value-objects/DraftId.ts";

export class GetDraftById {
  private userRepository: UserRepository;
  private draftFinder: DraftFinder;
  private userFinder: UserFinder;
  private resourceAccessChecker: ResourceAccessChecker;
  constructor(
    draftRepository: DraftRepository,
    userRepository: UserRepository,
  ) {
    this.draftFinder = new DraftFinder(draftRepository);
    this.userRepository = userRepository;
    this.userFinder = new UserFinder(userRepository);
    this.resourceAccessChecker = new ResourceAccessChecker();
  }

  async run(draftId: string, actorId: string) {
    const draft = await this.draftFinder.findById(new DraftId(draftId));
    await this.resourceAccessChecker.check(
      UserId.fromPrimitives(actorId),
      draft.userId,
    );

    const user = await this.userFinder.findById(UserId.fromPrimitives(actorId));
    const item = RecentlyViewedItem.fromPrimitives({
      id: draft.id.toPrimitives(),
      type: RecentlyViewedItemType.DRAFT,
      openedAt: new Date(),
    });
    user.viewItem(item);
    await this.userRepository.edit(user);
    // If draft is owned by actor, then return it
    return draft;
  }
}
