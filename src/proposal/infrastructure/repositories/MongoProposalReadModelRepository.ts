import { Db, type Collection } from "mongodb";
import { container } from "../../../container.ts";
import type { PostPrimitives } from "../../../post/domain/Post.ts";
import type { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { MongoCollections } from "../../../shared/persistance/infrastructure/mongo/MongoCollections.ts";
import type { UserPrimitives } from "../../../user/domain/User.ts";
import type { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { type ProposalPrimitives } from "../../domain/Proposal.ts";
import type { ProposalReadModel } from "../../domain/read-models/ProposalReadModel.ts";
import type { ProposalReadModelRepository } from "../../domain/repositories/ProposalReadModelRepository.ts";
import type { ProposalId } from "../../domain/value-objects/ProposalId.ts";
import { mapDocumentToProposalReadModel } from "../utils/mapDocumentToProposalReadModel.ts";

export class MongoProposalReadModelRepository implements ProposalReadModelRepository {
  private readonly proposals: Collection<ProposalPrimitives>;
  private readonly users: Collection<UserPrimitives>;
  private readonly posts: Collection<PostPrimitives>;

  public static async create() {
    const db = await container.getAsync(Db);
    return new MongoProposalReadModelRepository(db);
  }

  constructor(db: Db) {
    this.proposals = db.collection(MongoCollections.PROPOSALS);
    this.users = db.collection(MongoCollections.USERS);
    this.posts = db.collection(MongoCollections.POSTS);
  }

  async getOneById(id: ProposalId): Promise<ProposalReadModel | undefined> {
    const proposal = await this.proposals
      .aggregate([
        { $match: { id: id.toPrimitives() } },
        { $limit: 1 },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "postId",
            foreignField: "id",
            as: "post",
          },
        },
        { $unwind: "$user" },
        { $unwind: "$post" },
        { $project: { _id: 0 } },
      ])
      .next();

    return proposal ? mapDocumentToProposalReadModel(proposal) : undefined;
  }

  async getAllByUserId(userId: UserId): Promise<ProposalReadModel[]> {
    const proposals = await this.proposals
      .aggregate([
        { $match: { userId: userId.toPrimitives() } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "postId",
            foreignField: "id",
            as: "post",
          },
        },
        { $unwind: "$user" },
        { $unwind: "$post" },
        { $project: { _id: 0 } },
      ])
      .toArray();

    return proposals.map((proposal) =>
      mapDocumentToProposalReadModel(proposal),
    );
  }

  async getAllByPostId(postId: PostId): Promise<ProposalReadModel[]> {
    const proposals = await this.proposals
      .aggregate([
        { $match: { postId: postId.toPrimitives() } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "postId",
            foreignField: "id",
            as: "post",
          },
        },
        { $unwind: "$user" },
        { $unwind: "$post" },
        { $project: { _id: 0 } },
      ])
      .toArray();

    return proposals.map((proposal) =>
      mapDocumentToProposalReadModel(proposal),
    );
  }
}
