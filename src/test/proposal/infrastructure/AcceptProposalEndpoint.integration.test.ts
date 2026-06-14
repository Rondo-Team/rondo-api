import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../config/domain/Token.ts";
import { container } from "../../../container.ts";
import { ONE_STEP_POST } from "../../../shared/utils/domain/fixtures/posts.ts";
import { TWO_STEP_PROPOSAL } from "../../../shared/utils/domain/fixtures/proposals.ts";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../shared/utils/domain/fixtures/users.ts";
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

describe("accept proposal endpoint tests", () => {
  it("should accept a proposal successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    await registerUser(PEDRO_MARTINEZ);
    const manolo_token = await loginUser(MANOLO_LOPEZ);
    await insertPost(ONE_STEP_POST);
    await insertProposal(TWO_STEP_PROPOSAL);

    const res = await app.request(
      `/api/v1/proposal/${TWO_STEP_PROPOSAL.id}/accept`,
      {
        method: "POST",
        headers: {
          Cookie: `accessToken=${manolo_token}`,
          "Content-Type": "application/json",
        },
      },
    );

    expect(res.status).toBe(200);
  });

  it("should not accept a proposal if proposal does not exist", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    const res = await app.request(
      `/api/v1/proposal/${MANOLO_LOPEZ.id}/accept`,
      {
        method: "POST",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    expect(res.status).toBe(404);
  });

  it("should not accept a proposal if user is not the post owner", async () => {
    await registerUser(MANOLO_LOPEZ);
    await registerUser(PEDRO_MARTINEZ);
    const pedro_token = await loginUser(PEDRO_MARTINEZ);
    await insertPost(ONE_STEP_POST);
    await insertProposal(TWO_STEP_PROPOSAL);

    const res = await app.request(
      `/api/v1/proposal/${TWO_STEP_PROPOSAL.id}/accept`,
      {
        method: "POST",
        headers: {
          Cookie: `accessToken=${pedro_token}`,
          "Content-Type": "application/json",
        },
      },
    );

    expect(res.status).toBe(401);
  });
});
