import { Db, type Collection } from "mongodb";
import { container } from "../../../container.ts";
import type { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { MongoCollections } from "../../../shared/persistance/infrastructure/mongo/MongoCollections.ts";
import type { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { Proposal, type ProposalPrimitives } from "../../domain/Proposal.ts";
import type { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";
import type { ProposalId } from "../../domain/value-objects/ProposalId.ts";

export class MongoProposalRepository implements ProposalRepository {
  private readonly proposals: Collection<ProposalPrimitives>;

  public static async create() {
    const db = await container.getAsync(Db);
    return new MongoProposalRepository(db);
  }

  constructor(db: Db) {
    this.proposals = db.collection(MongoCollections.PROPOSALS);
  }

  async create(proposal: Proposal): Promise<void> {
    const primitives = proposal.toPrimitives();
    await this.proposals.insertOne(primitives);
  }

  async getOneById(id: ProposalId): Promise<Proposal | undefined> {
    const proposal = await this.proposals.findOne(
      { id: id.toPrimitives() },
      { projection: { _id: 0 } }
    );

    return proposal ? Proposal.fromPrimitives(proposal) : undefined;
  }

  async getAllByUserId(userId: UserId): Promise<Proposal[]> {
    const proposals = await this.proposals
      .find({
        userId: userId.toPrimitives(),
      })
      .toArray();

    return proposals.map((proposal) => Proposal.fromPrimitives(proposal));
  }

  async getAllByPostId(postId: PostId): Promise<Proposal[]> {
    const proposals = await this.proposals
      .find({
        postId: postId.toPrimitives(),
      })
      .toArray();

    return proposals.map((proposal) => Proposal.fromPrimitives(proposal));
  }

  async existsWithId(id: ProposalId): Promise<boolean> {
    return (
      (await this.proposals.countDocuments(
        { id: id.toPrimitives() },
        { limit: 1 }
      )) > 0
    );
  }

  async edit(proposal: Proposal): Promise<void> {
    const primitives = proposal.toPrimitives();
    await this.proposals.updateOne({ id: primitives.id }, { $set: primitives });
  }

  async deleteById(id: ProposalId): Promise<void> {
    await this.proposals.deleteOne({ id: id.toPrimitives() });
  }
}
