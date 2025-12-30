import type { Primitives } from "../../shared/domain/types/Primitives.ts";
import { CreatedAt } from "../../shared/domain/value-objects/CreatedAt.ts";
import { Play } from "../../shared/domain/value-objects/Play.ts";
import { UserId } from "../../user/domain/value-objects/UserId.ts";
import { DraftDescription } from "./value-objects/DraftDescription.ts";
import { DraftId } from "./value-objects/DraftId.ts";
import { DraftTitle } from "./value-objects/DraftTitle.ts";

export type DraftPrimitives = Primitives<Draft>

export class Draft {
  id: DraftId;
  userId: UserId;
  title: DraftTitle;
  description: DraftDescription;
  createdAt: CreatedAt;
  play: Play;

  constructor(
    id: DraftId,
    userId: UserId,
    title: DraftTitle,
    description: DraftDescription,
    createdAt: CreatedAt,
    play: Play
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.play = play;
  }

  toPrimitives() {
      return {
        id: this.id.toPrimitives(),
        userId: this.userId.toPrimitives(),
        title: this.title.toPrimitives(),
        description: this.description.toPrimitives(),
        createdAt: this.createdAt.toPrimitives(),
        play: this.play.toPrimitives(),
      };
    }
  
    static fromPrimitives(draft: DraftPrimitives): Draft {
      return new Draft(
        DraftId.fromPrimitives(draft.id),
        UserId.fromPrimitives(draft.userId),
        DraftTitle.fromPrimitives(draft.title),
        DraftDescription.fromPrimitives(draft.description),
        CreatedAt.fromPrimitives(draft.createdAt),
        Play.fromPrimitives(draft.play)
      );
    }

  changeTitle(newTitle: DraftTitle) {
    this.title = newTitle;
  }

  changeDescription(newDescription: DraftDescription) {
    this.description = newDescription;
  }

  changePlay(newPlay: Play) {
    this.play = newPlay;
  }
}
