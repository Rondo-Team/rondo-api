import { PlayElementType } from "../../../domain/value-objects/PlayElementType.ts";

export const SAMPLE_DRAFT = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  userId: "123e4567-e89b-12d3-a456-426614174000",
  title: "My sample draft",
  description: "Sample draft description",
  createdAt: new Date(),
  play: {
    steps: [
      {
        elements: [
          {
            id: "550a8400-e29b-41d4-a716-446655440000",
            x: 10,
            y: 20,
            elementType: PlayElementType.BALL,
          },
          {
            id: "350a8400-e29b-41d4-a716-446655440000",
            x: 15,
            y: 20,
            elementType: PlayElementType.PLAYER,
          },
        ],
      },
      {
        elements: [
          {
            id: "550a8400-e29b-41d4-a716-446655440000",
            x: 5,
            y: 20,
            elementType: PlayElementType.BALL,
          },
          {
            id: "350a8400-e29b-41d4-a716-446655440000",
            x: 20,
            y: 20,
            elementType: PlayElementType.PLAYER,
          },
        ],
      },
    ],
  },
};
