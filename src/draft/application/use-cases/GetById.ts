import { DraftRepository } from "@/draft/domain/repositories/DraftRepository";
import { DraftFinder } from "@/draft/domain/services/DraftFinder";
import { DraftId } from "@/draft/domain/value-objects/DraftId";

export class GetById {
  private draftFinder: DraftFinder;
  constructor(private draftRepository: DraftRepository) {
    this.draftFinder = new DraftFinder(draftRepository);
  }

  async run(id: string) {
    return this.draftFinder.findById(new DraftId(id));
  }
}
