import { PostId } from "@/post/domain/value-objects/PostId";
import { Proposal } from "../Proposal";
import { ProposalId } from "../value-objects/ProposalId";
import { UserId } from "@/user/domain/value-objects/UserId";

export interface ProposalRepository {
  create(proposal: Proposal): Promise<void>;
  getOneById(id: ProposalId): Promise<Proposal | undefined>;
  getAllByUserId(userId: UserId): Promise<Proposal[] | undefined>;
  getAllByPostId(postId: PostId): Promise<Proposal[] | undefined>;
  existsWithId(id: ProposalId): Promise<boolean>
  edit(post: Proposal): Promise<void>;
  deleteById(id: ProposalId): Promise<void>;
}