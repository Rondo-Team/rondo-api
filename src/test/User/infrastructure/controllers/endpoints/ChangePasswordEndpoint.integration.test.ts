import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import {
  MANOLO_LOPEZ,
  ROBERTO_PEREZ,
} from "../../../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../../../utils/clearTestDatabase.ts";
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

describe("update user password endpoint tests", () => {
  it("should update a user password", async () => {
    await registerUser(ROBERTO_PEREZ);
    const accessToken = await loginUser(ROBERTO_PEREZ);

    const res = await app.request(`/api/v1/users/me/password`, {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: ROBERTO_PEREZ.password,
        newPassword: MANOLO_LOPEZ.password,
      }),
    });

    expect(res.status).toBe(200);
  });

  it("should not update a user password if current password is incorrect", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    const res = await app.request(`/api/v1/users/me/password`, {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: ROBERTO_PEREZ.password,
        newPassword: ROBERTO_PEREZ.password,
      }),
    });

    expect(res.status).toBe(401);
  });
});
