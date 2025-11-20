import { PlayElementType } from "@/shared/domain/value-objects/PlayElementType"

export type PlayDTO = {
  steps: {
    id: string,
    x: number,
    y: number,
    elementType: PlayElementType
  }[][]
}