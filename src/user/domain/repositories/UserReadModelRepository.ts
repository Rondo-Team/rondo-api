import type { UserProfileReadModel } from "../read-model/UserProfileReadModel.ts";
import type { UserProfileResumeReadModel } from "../read-model/UserProfileResumeReadModel.ts";
import { UserEmail } from "../value-objects/UserEmail.ts";
import { UserId } from "../value-objects/UserId.ts";

export interface UserReadModelRepository {
  getOneById(id: UserId): Promise<UserProfileReadModel | undefined>;
  getOneByEmail(
    email: UserEmail,
  ): Promise<UserProfileResumeReadModel | undefined>;
}
