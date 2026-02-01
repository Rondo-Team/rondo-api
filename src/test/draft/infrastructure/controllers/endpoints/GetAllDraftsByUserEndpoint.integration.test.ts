import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import {
  ONE_STEP_DRAFT,
  TWO_STEPS_DRAFT,
} from "../../../../../shared/utils/domain/fixtures/drafts.ts";
import { MANOLO_LOPEZ } from "../../../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../../../utils/clearTestDatabase.ts";
import { insertDraft } from "../../../../utils/insertDraft.ts";
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

describe("get all drafts by user endpoint tests", () => {
  it("should get all drafts by user successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);
    await insertDraft(TWO_STEPS_DRAFT);
    await insertDraft(ONE_STEP_DRAFT);

    const res = await app.request(`/api/v1/drafts`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    expect(res.status).toBe(200);
  });
});
