import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../config/domain/Token.ts";
import { container } from "../../../container.ts";
import { ONE_STEP_POST } from "../../../shared/utils/domain/fixtures/posts.ts";
import { TWO_STEP_PROPOSAL } from "../../../shared/utils/domain/fixtures/proposals.ts";
import { MANOLO_LOPEZ } from "../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../utils/clearTestDatabase.ts";
import { insertPost } from "../../utils/insertPost.ts";
import { insertProposal } from "../../utils/insertProposal.ts";
import { loginUser, registerUser } from "../../utils/userAuthentication.ts";

let app;

beforeAll(async () => {
  app = await container.getAsync(Token.APP);
});

beforeEach(async () => {
  await clearTestDatabase();
});

afterAll(async () => {
  await clearTestDatabase();
});

describe("get all proposals by post id endpoint tests", () => {
  it("should get all proposals for a post by id successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    await insertPost(ONE_STEP_POST);
    await insertProposal(TWO_STEP_PROPOSAL);

    const res = await app.request(`/api/v1/proposal/post/${ONE_STEP_POST.id}`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    expect(res.status).toBe(200);
  });

  it("should not get proposals if post does not exist", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    const res = await app.request(`/api/v1/proposal/post/${ONE_STEP_POST.id}`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    expect(res.status).toBe(404);
  });
});
