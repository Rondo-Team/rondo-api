import { UPPER_PROPOSALS_LIMIT } from "@/config/domain/Consts";
import { Count } from "@/shared/domain/value-objects/Count";
import { ProposalsCountInvalidError } from "@/user/domain/errors/ProposalsCountInvalidError";

export class UserProposalsCount extends Count {
  constructor(readonly value: number) {
    super(value, UPPER_PROPOSALS_LIMIT);
  }

  protected CountIsInvalidError() {
    return new ProposalsCountInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }
}
