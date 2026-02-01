import { UnauthorizedUserActionError } from "../errors/UnauthorizedUserActionError.ts";
import type { Id } from "../value-objects/Id.ts";

export class ResourceAccessChecker {
  constructor() {}
  async check(actorId: Id, resourceOwnerId: Id) {
    if (actorId.toPrimitives() !== resourceOwnerId.toPrimitives())
      throw new UnauthorizedUserActionError();
  }
}
