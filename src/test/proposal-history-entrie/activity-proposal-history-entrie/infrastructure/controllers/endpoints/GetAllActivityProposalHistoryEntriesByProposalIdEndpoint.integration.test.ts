import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../../config/domain/Token.ts";
import { container } from "../../../../../../container.ts";
import { ACTIVITY_PROPOSAL_HISTORY_ENTRIE } from "../../../../../../shared/utils/domain/fixtures/activityHistoryEntrie.ts";
import { ONE_STEP_POST } from "../../../../../../shared/utils/domain/fixtures/posts.ts";
import { TWO_STEP_PROPOSAL } from "../../../../../../shared/utils/domain/fixtures/proposals.ts";
import { MANOLO_LOPEZ } from "../../../../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../../../../utils/clearTestDatabase.ts";
import { insertActivityProposalHistoryEntrie } from "../../../../../utils/insertActivityProposalHistoryEntrie.ts";
import { insertPost } from "../../../../../utils/insertPost.ts";
import { insertProposal } from "../../../../../utils/insertProposal.ts";
import {
  loginUser,
  registerUser,
} from "../../../../../utils/userAuthentication.ts";

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

describe("get all activity proposal history entries by proposal id endpoint tests", () => {
  it("should get all activity proposal history entries for a proposal by id successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    await insertPost(ONE_STEP_POST);
    await insertProposal(TWO_STEP_PROPOSAL);
    await insertActivityProposalHistoryEntrie(ACTIVITY_PROPOSAL_HISTORY_ENTRIE);

    const res = await app.request(
      `/api/v1/activity-proposal-history-entrie/proposal/${TWO_STEP_PROPOSAL.id}`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    expect(res.status).toBe(200);
  });

  it("should not get activity proposal history entries if proposal does not exist", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    const res = await app.request(
      `/api/v1/activity-proposal-history-entrie/proposal/${TWO_STEP_PROPOSAL.id}`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    expect(res.status).toBe(404);
  });
});
