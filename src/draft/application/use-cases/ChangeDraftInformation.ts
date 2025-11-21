import { DraftRepository } from "@/draft/domain/repositories/DraftRepository";
import { DraftFinder } from "@/draft/domain/services/DraftFinder";
import { DraftDescription } from "@/draft/domain/value-objects/DraftDescription";
import { DraftId } from "@/draft/domain/value-objects/DraftId";
import { DraftTitle } from "@/draft/domain/value-objects/DraftTitle";

export class ChangeDraftInformation {
  private draftFinder: DraftFinder;
  constructor(private draftRepository: DraftRepository) {
    this.draftFinder = new DraftFinder(draftRepository);
  }

  async run(id: string, newTitle: string, newDescription: string) {
    const draft = await this.draftFinder.findById(new DraftId(id));

    draft.changeTitle(new DraftTitle(newTitle));
    draft.changeDescription(new DraftDescription(newDescription));

    return this.draftRepository.edit(draft);
  }
}
