import { DraftNotFoundByIdError } from "../errors/DraftNotFoundByIdError.ts";
import { type DraftRepository } from "../repositories/DraftRepository.ts";
import { DraftId } from "../value-objects/DraftId.ts";

export class DraftFinder {
  private draftRepository: DraftRepository;
  constructor(draftRepository: DraftRepository) {
    this.draftRepository = draftRepository;
  }

  async findById(id: DraftId) {
    const draft = await this.draftRepository.getOneById(id);
    if (!draft) throw new DraftNotFoundByIdError(id.toPrimitives());
    return draft;
  }
}
