import { TWO_STEPS_PLAY } from "./plays.ts";
import { ONE_STEP_POST } from "./posts.ts";
import { MANOLO_LOPEZ } from "./users.ts";

export const TWO_STEP_PROPOSAL = {
  id: "b0470ad9-6037-4b11-907f-e4dc5eb17bd5",
  userId: MANOLO_LOPEZ.id,
  postId: ONE_STEP_POST.id,
  title: "My proposal with one step",
  description:
    "This is a proposal made to a post with one step, i will add one step",
  createdAt: new Date(),
  play: TWO_STEPS_PLAY,
};
