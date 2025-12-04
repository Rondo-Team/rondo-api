import { UPPER_PROPOSALS_LIMIT } from "../../../config/domain/Consts.ts";
import { Count } from "../../../shared/domain/value-objects/Count.ts";
import { ProposalsCountInvalidError } from "../errors/ProposalsCountInvalidError.ts";

export class UserProposalsCount extends Count {
  readonly value: number;
  constructor(value: number) {
    super(value, UPPER_PROPOSALS_LIMIT);
    this.value = value;
  }

  protected CountIsInvalidError() {
    return new ProposalsCountInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }

  static fromPrimitives(value: number) {
    return new UserProposalsCount(value);
  }
}
