import type { ResolutionContext } from "inversify";
import { Db, type Collection } from "mongodb";
import type { DraftPrimitives } from "../../../draft/domain/Draft.ts";
import type { PostPrimitives } from "../../../post/domain/Post.ts";
import { RecentlyViewedItemType } from "../../../shared/domain/types/RecentlyViewedItemType.ts";
import { MongoCollections } from "../../../shared/persistance/infrastructure/mongo/MongoCollections.ts";
import type { UserProfileReadModel } from "../../domain/read-model/UserProfileReadModel.ts";
import type { UserProfileResumeReadModel } from "../../domain/read-model/UserProfileResumeReadModel.ts";
import type { UserReadModelRepository } from "../../domain/repositories/UserReadModelRepository.ts";
import type { UserPrimitives } from "../../domain/User.ts";
import type { UserEmail } from "../../domain/value-objects/UserEmail.ts";
import type { UserId } from "../../domain/value-objects/UserId.ts";
import { mapDocumentToUserProfileReadModel } from "../utils/mapDocumentToUserProfileReadModel.ts";
import { mapDocumentToUserProfileResumeReadModel } from "../utils/mapDocumentToUserProfileResumeReadModel.ts";

export class MongoUserReadModelRepository implements UserReadModelRepository {
  private readonly users: Collection<UserPrimitives>;
  private readonly posts: Collection<PostPrimitives>;
  private readonly drafts: Collection<DraftPrimitives>;
  public static async create(container: ResolutionContext) {
    const db = await container.getAsync(Db);
    return new MongoUserReadModelRepository(db);
  }
  constructor(db: Db) {
    this.users = db.collection(MongoCollections.USERS);
    this.posts = db.collection(MongoCollections.POSTS);
    this.drafts = db.collection(MongoCollections.DRAFTS);
  }

  async getOneById(id: UserId): Promise<UserProfileReadModel | undefined> {
    const user = await this.users.findOne(
      { id: id.toPrimitives() },
      { projection: { _id: 0 } },
    );
    if (!user) return undefined;

    const recentlyViewedContent = user.recentlyViewedContent ?? [];

    const enrichedRecentlyViewedContent = await Promise.all(
      recentlyViewedContent.map(async (item) => {
        if (item.type === RecentlyViewedItemType.POST) {
          const post = await this.posts.findOne(
            { id: item.id },
            { projection: { _id: 0, title: 1 } },
          );

          return {
            ...item,
            title: post?.title,
          };
        }

        if (item.type === RecentlyViewedItemType.DRAFT) {
          const draft = await this.drafts.findOne(
            { id: item.id },
            { projection: { _id: 0, title: 1 } },
          );

          return {
            ...item,
            title: draft?.title,
          };
        }
      }),
    );

    const document = {
      ...user,
      recentlyViewedContent: enrichedRecentlyViewedContent,
    };

    console.log(document);

    return mapDocumentToUserProfileReadModel(document);
  }

  async getOneByEmail(
    email: UserEmail,
  ): Promise<UserProfileResumeReadModel | undefined> {
    const user = await this.users.findOne(
      { email: email.toPrimitives() },
      { projection: { _id: 0 } },
    );
    return user ? mapDocumentToUserProfileResumeReadModel(user) : undefined;
  }
}
