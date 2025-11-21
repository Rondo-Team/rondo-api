import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { Play } from "@/shared/domain/value-objects/Play";
import { UserId } from "@/user/domain/value-objects/UserId";
import { DraftDescription } from "./value-objects/DraftDescription";
import { DraftId } from "./value-objects/DraftId";
import { DraftTitle } from "./value-objects/DraftTitle";

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
