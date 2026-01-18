import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../config/domain/Token.ts";
import { container } from "../../../container.ts";
import { ONE_STEP_POST } from "../../../shared/utils/domain/fixtures/posts.ts";
import { TWO_STEP_PROPOSAL } from "../../../shared/utils/domain/fixtures/proposals.ts";
import { MANOLO_LOPEZ } from "../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../utils/clearTestDatabase.ts";
import { insertPost } from "../../utils/insertPost.ts";
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

describe("create proposal endpoint tests", () => {
  it("should create a proposal successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);
    await insertPost(ONE_STEP_POST);

    const res = await app.request("/api/v1/proposal", {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: TWO_STEP_PROPOSAL.id,
        postId: TWO_STEP_PROPOSAL.postId,
        title: TWO_STEP_PROPOSAL.title,
        description: TWO_STEP_PROPOSAL.description,
        play: TWO_STEP_PROPOSAL.play,
      }),
    });

    expect(res.status).toBe(201);
  });
});
