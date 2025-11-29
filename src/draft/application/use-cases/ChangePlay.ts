import { DraftRepository } from "@/draft/domain/repositories/DraftRepository";
import { DraftFinder } from "@/draft/domain/services/DraftFinder";
import { DraftId } from "@/draft/domain/value-objects/DraftId";
import { PlayDTO } from "@/shared/application/dtos/PlayDTO";
import { Play } from "@/shared/domain/value-objects/Play";

export class ChangePlay {
  private readonly draftFinder: DraftFinder;
  constructor(private draftRepository: DraftRepository) {
    this.draftFinder = new DraftFinder(draftRepository);
  }

  async run(id: string, newPlay: PlayDTO) {
    const draft = await this.draftFinder.findById(new DraftId(id));
    draft.changePlay(Play.fromPrimitives(newPlay.steps));

    return this.draftRepository.edit(draft);
  }
}
