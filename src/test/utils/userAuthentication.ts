import { Token } from "../../config/domain/Token.ts";
import { container } from "../../container.ts";
import { LoginUser } from "../../user/application/use-cases/LoginUser.ts";
import { RegisterUser } from "../../user/application/use-cases/RegisterUser.ts";

type TestUser = {
  id: string;
  email: string;
  username: string;
  name: string;
  profilePicture: string;
  password: string;
  postsCount: number;
  proposalsCount: number;
  favouritePostsCount: number;
  commentsCount: number;
  createdAt: Date;
};

export async function registerUser(TEST_USER: TestUser) {
  const registerUser = await container.getAsync<RegisterUser>(
    Token.REGISTER_USER
  );
  await registerUser.run(
    TEST_USER.id,
    TEST_USER.email,
    TEST_USER.username,
    TEST_USER.name,
    TEST_USER.profilePicture,
    TEST_USER.password,
    TEST_USER.postsCount,
    TEST_USER.proposalsCount,
    TEST_USER.favouritePostsCount,
    TEST_USER.commentsCount,
    TEST_USER.createdAt
  );
}

export async function loginUser(TEST_USER: TestUser) {
  const loginUser = await container.getAsync<LoginUser>(Token.LOGIN_USER);
  const { accessToken } = await loginUser.run(
    TEST_USER.email,
    TEST_USER.password
  );
  return accessToken;
}
