import { UnauthorizedUserActionError } from "../errors/UnauthorizedUserActionError.ts";
import { UserId } from "../value-objects/UserId.ts";

export class UserAuthorizationChecker {
  constructor() {}

  async check(actorId: UserId, objectiveId: UserId) {
    if (actorId.toPrimitives() !== objectiveId.toPrimitives())
      throw new UnauthorizedUserActionError();
  }
}
