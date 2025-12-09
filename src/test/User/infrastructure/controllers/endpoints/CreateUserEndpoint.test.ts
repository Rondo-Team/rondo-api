import supertest from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import { clearTestDatabase } from "../../../../utils/ClearTestDatabase.ts";

let app;

beforeAll(async () => {
  await clearTestDatabase();
  app = await container.getAsync(Token.APP);
});

describe("create user endpoint tests", () => {
  it("should create a user", async () => {
    const res = await supertest(app).post("/api/v1/users").send({
      id: "123e4567-e89b-12d3-a456-426614174000",
      email: "example@gmail.com",
      username: "example",
      name: "Example",
      password: "PasswordExample10_",
    });

    console.log(res.body);
    expect(res.status).toBe(201);
  });
});
