import type { PostRepository } from "../../../post/domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../post/domain/services/PostFinder.ts";
import { UnauthorizedUserActionError } from "../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../domain/services/ProposalFinder.ts";
import { ProposalHistoryEntriePayloadMessage } from "../../domain/value-objects/ProposalHistoryEntriePayload.ts";
import { ProposalId } from "../../domain/value-objects/ProposalId.ts";

export class ReplyProposal {
  private proposalRepository: ProposalRepository;
  private readonly proposalFinder: ProposalFinder;
  private readonly postFinder: PostFinder;
  private postRepository: PostRepository;

  constructor(
    proposalRepository: ProposalRepository,
    postRepository: PostRepository,
  ) {
    this.proposalRepository = proposalRepository;
    this.proposalFinder = new ProposalFinder(proposalRepository);
    this.postRepository = postRepository;
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string, actorId: string, message: string) {
    const proposal = await this.proposalFinder.findById(
      ProposalId.fromPrimitives(id),
    );
    const actorUserId = UserId.fromPrimitives(actorId);
    const post = await this.postFinder.findById(proposal.postId);

    const canReply =
      proposal.isOwnedBy(actorUserId) || post.isOwnedBy(actorUserId);
    if (!canReply) throw new UnauthorizedUserActionError();

    proposal.reply(
      actorUserId,
      CreatedAt.now(),
      ProposalHistoryEntriePayloadMessage.fromPrimitives(message),
    );

    return this.proposalRepository.edit(proposal);
  }
}
