import { UserId } from "@/user/domain/value-objects/UserId";
import { CreatedAt } from "../../domain/value-objects/CreatedAt";
import { FavouriteId } from "./value-objects/FavouriteId";

export abstract class Favourite {
  id: FavouriteId;
  userId: UserId;
  createdAt: CreatedAt;

  constructor(
    id: FavouriteId,
    userId: UserId,
    createdAt: CreatedAt
  ) {
    this.id = id
    this.userId = userId
    this.createdAt = createdAt
  }
}