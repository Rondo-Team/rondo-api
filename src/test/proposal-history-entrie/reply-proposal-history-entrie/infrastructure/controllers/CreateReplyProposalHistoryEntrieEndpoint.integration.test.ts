import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import { ONE_STEP_POST } from "../../../../../shared/utils/domain/fixtures/posts.ts";
import { TWO_STEP_PROPOSAL } from "../../../../../shared/utils/domain/fixtures/proposals.ts";
import { REPLY_PROPOSAL_HISTORY_ENTRIE } from "../../../../../shared/utils/domain/fixtures/replyHistoryEntrie.ts";
import { MANOLO_LOPEZ } from "../../../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../../../utils/clearTestDatabase.ts";
import { insertPost } from "../../../../utils/insertPost.ts";
import { insertProposal } from "../../../../utils/insertProposal.ts";
import {
  loginUser,
  registerUser,
} from "../../../../utils/userAuthentication.ts";

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

describe("create reply proposal history entrie endpoint tests", () => {
  it("should create a reply proposal history entrie successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);
    await insertPost(ONE_STEP_POST);
    await insertProposal(TWO_STEP_PROPOSAL);

    const res = await app.request("/api/v1/reply-proposal-history-entrie", {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: REPLY_PROPOSAL_HISTORY_ENTRIE.id,
        proposalId: REPLY_PROPOSAL_HISTORY_ENTRIE.proposalId,
        message: REPLY_PROPOSAL_HISTORY_ENTRIE.message,
      }),
    });

    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.message).toBe(
      "Reply proposal history entrie created succesfully",
    );
  });
});
