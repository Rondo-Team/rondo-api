import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { Proposal } from "../Proposal.ts";
import { ProposalId } from "../value-objects/ProposalId.ts";

export interface ProposalRepository {
  create(proposal: Proposal): Promise<void>;
  getOneById(id: ProposalId): Promise<Proposal | undefined>;
  getAllByUserId(userId: UserId): Promise<Proposal[]>;
  getAllByPostId(postId: PostId): Promise<Proposal[]>;
  existsWithId(id: ProposalId): Promise<boolean>;
  edit(proposal: Proposal): Promise<void>;
  deleteById(id: ProposalId): Promise<void>;
}
