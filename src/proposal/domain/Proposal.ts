import { PostId } from "@/post/domain/value-objects/PostId";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { Play } from "@/shared/domain/value-objects/Play";
import { UserId } from "@/user/domain/value-objects/UserId";
import { ProposalDescription } from "./value-objects/ProposalDescription";
import { ProposalId } from "./value-objects/ProposalId";
import { ProposalTitle } from "./value-objects/ProposalTitle";

export class Post {
  id: ProposalId;
  userId: UserId;
  postId: PostId;
  title: ProposalTitle;
  description: ProposalDescription;
  createdAt: CreatedAt;
  play: Play;

  constructor(
    id: ProposalId,
    userId: UserId,
    postId: PostId,
    title: ProposalTitle,
    description: ProposalDescription,
    createdAt: CreatedAt,
    play: Play
  ) {
    this.id = id;
    this.userId = userId;
    this.postId = postId
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.play = play;
  }

  changeTitle(newTitle: ProposalTitle) {
    this.title = newTitle;
  }

  changeDescription(newDescription: ProposalDescription) {
    this.description = newDescription;
  }

  changePlay(newPlay: Play) {
    this.play = newPlay
  }
}
