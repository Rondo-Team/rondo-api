import type { PlayDTO } from "../../../shared/application/dtos/PlayDTO.ts";
import { Play } from "../../../shared/domain/value-objects/Play.ts";
import type { DraftRepository } from "../../domain/repositories/DraftRepository.ts";
import { DraftFinder } from "../../domain/services/DraftFinder.ts";
import { DraftId } from "../../domain/value-objects/DraftId.ts";

export class ChangePlay {
  private draftRepository: DraftRepository;
  private readonly draftFinder: DraftFinder;
  constructor(draftRepository: DraftRepository) {
    this.draftRepository = draftRepository;
    this.draftFinder = new DraftFinder(draftRepository);
  }

  async run(id: string, newPlay: PlayDTO) {
    const draft = await this.draftFinder.findById(new DraftId(id));
    draft.changePlay(Play.fromPrimitives(newPlay.steps));

    return this.draftRepository.edit(draft);
  }
}
