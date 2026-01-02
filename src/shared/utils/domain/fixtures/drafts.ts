import { ONE_STEP_PLAY, TWO_STEPS_PLAY } from "./plays.ts";

export const TWO_STEPS_DRAFT = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  userId: "123e4567-e89b-12d3-a456-426614174000",
  title: "My draft with two steps",
  description: "This is a draft with two steps",
  createdAt: new Date(),
  play: TWO_STEPS_PLAY,
};

export const ONE_STEP_DRAFT = {
  id: "550e8400-e29b-41d4-a716-446655440001",
  userId: "123e4567-e89b-12d3-a456-426614174000",
  title: "My one step draft",
  description: "This is a draft with just one step",
  createdAt: new Date(),
  play: ONE_STEP_PLAY,
};
