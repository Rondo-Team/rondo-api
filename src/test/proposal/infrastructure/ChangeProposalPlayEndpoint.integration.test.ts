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

describe("change proposal play by id endpoint tests", () => {
  it("should change a proposal play by id successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);
    await insertPost(ONE_STEP_POST);
    await insertProposal(TWO_STEP_PROPOSAL);

    const res = await app.request(
      `/api/v1/proposal/${TWO_STEP_PROPOSAL.id}/play`,
      {
        method: "PATCH",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPlay: TWO_STEP_PROPOSAL.play,
        }),
      },
    );
    expect(res.status).toBe(200);
  });

  it("should not change a proposal play if post it does not exist", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    const res = await app.request(
      `/api/v1/proposal/${TWO_STEP_PROPOSAL.id}/play`,
      {
        method: "PATCH",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPlay: TWO_STEP_PROPOSAL.play,
        }),
      },
    );

    expect(res.status).toBe(404);
  });

  it("should not change a proposal play if user does not own it", async () => {
    await registerUser(PEDRO_MARTINEZ);
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(PEDRO_MARTINEZ);
    await insertPost(ONE_STEP_POST);
    await insertProposal(TWO_STEP_PROPOSAL);

    const res = await app.request(
      `/api/v1/proposal/${TWO_STEP_PROPOSAL.id}/play`,
      {
        method: "PATCH",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPlay: TWO_STEP_PROPOSAL.play,
        }),
      },
    );

    expect(res.status).toBe(401);
  });
});
