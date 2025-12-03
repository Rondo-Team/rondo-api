import { CreatedAt } from "../../shared/domain/value-objects/CreatedAt.ts";
import { Play } from "../../shared/domain/value-objects/Play.ts";
import { UserId } from "../../user/domain/value-objects/UserId.ts";
import { DraftDescription } from "./value-objects/DraftDescription.ts";
import { DraftId } from "./value-objects/DraftId.ts";
import { DraftTitle } from "./value-objects/DraftTitle.ts";

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
