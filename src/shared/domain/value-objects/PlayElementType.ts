export const PlayElementType = {
  TEAMMATE: "TEAMMATE",
  RIVAL: "RIVAL",
  BALL: "BALL",
};

export type PlayElementType =
  (typeof PlayElementType)[keyof typeof PlayElementType];
