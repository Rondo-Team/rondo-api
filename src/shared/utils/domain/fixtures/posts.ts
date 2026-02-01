import { ONE_STEP_PLAY, TWO_STEPS_PLAY } from "./plays.ts";
import { MANOLO_LOPEZ } from "./users.ts";

export const ONE_STEP_POST = {
  id: "440e8400-e29b-41d4-a716-446655440000",
  userId: MANOLO_LOPEZ.id,
  title: "My post with one step",
  description: "This is a post with one step",
  favouritesCount: 0,
  commentsCount: 0,
  proposalsCount: 0,
  createdAt: new Date(),
  tags: ["433", "Attacking"],
  play: ONE_STEP_PLAY,
};

export const TWO_STEPS_POST = {
  id: "440e8400-e29b-41d4-a716-446655440001",
  userId: MANOLO_LOPEZ.id,
  title: "My post with one step",
  description: "This is a post with one step",
  favouritesCount: 0,
  commentsCount: 0,
  proposalsCount: 0,
  createdAt: new Date(),
  tags: ["433", "Attacking"],
  play: TWO_STEPS_PLAY,
};
