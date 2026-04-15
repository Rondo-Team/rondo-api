import type { PostId } from "../../../post/domain/value-objects/PostId.ts";
import type { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { ProposalReadModel } from "../read-models/ProposalReadModel.ts";
import type { ProposalId } from "../value-objects/ProposalId.ts";

export interface ProposalReadModelRepository {
  getOneById(id: ProposalId): Promise<ProposalReadModel | undefined>;
  getAllByUserId(userId: UserId): Promise<ProposalReadModel[]>;
  getAllByPostId(postId: PostId): Promise<ProposalReadModel[]>;
}
