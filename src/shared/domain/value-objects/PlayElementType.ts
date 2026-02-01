export const PlayElementType = {
  PLAYER: "PLAYER",
  BALL: "BALL",
};

export type PlayElementType =
  (typeof PlayElementType)[keyof typeof PlayElementType];
