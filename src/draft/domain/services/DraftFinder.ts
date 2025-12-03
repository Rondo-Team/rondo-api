import { DraftNotFoundByIdError } from "../errors/DraftNotFoundByIdError.ts";
import { DraftRepository } from "../repositories/DraftRepository.ts";
import { DraftId } from "../value-objects/DraftId.ts";

export class DraftFinder {
  constructor(private draftRepository: DraftRepository) {}

  async findById(id: DraftId) {
    const draft = await this.draftRepository.getOneById(id);
    if (!draft) throw new DraftNotFoundByIdError(id.toPrimitives());
    return draft;
  }
}
