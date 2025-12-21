import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import { clearTestDatabase } from "../../../../utils/clearTestDatabase.ts";

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

describe("create user endpoint tests", () => {
  it('should create a user successfully', async () => {
    const res = await app.request('/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'example@gmail.com',
        username: 'example',
        name: 'Example',
        password: 'PasswordExample10_',
      }),
    })
    expect(res.status).toBe(201)
  })
});

it("should not create user with an existent id", async () => {
  // Insert first element
  await app.request('/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'example@gmail.com',
      username: 'example',
      name: 'Example',
      password: 'PasswordExample10_',
    }),
  })

  // Insert second element
  const res = await app.request('/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'example@gmail.com',
      username: 'example',
      name: 'Example',
      password: 'PasswordExample10_',
    }),
  })

  expect(res.status).toBe(409);
});

it("should not create user with an existent email", async () => {
  // Insert first element
  await app.request('/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'example@gmail.com',
      username: 'example',
      name: 'Example',
      password: 'PasswordExample10_',
    }),
  })

  // Insert second element
  const res = await app.request('/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: '123e4567-e89b-12d3-a456-426614174001',
      email: 'example@gmail.com',
      username: 'example',
      name: 'Example',
      password: 'PasswordExample10_',
    }),
  })

  expect(res.status).toBe(409);
});

it("should not create user with an existent username", async () => {
  // Insert first element
  await app.request('/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'example@gmail.com',
      username: 'example',
      name: 'Example',
      password: 'PasswordExample10_',
    }),
  })

  // Insert second element
  const res = await app.request('/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: '123e4567-e89b-12d3-a456-426614174001',
      email: 'anotherexample@gmail.com',
      username: 'example',
      name: 'Example',
      password: 'PasswordExample10_',
    }),
  })

  expect(res.status).toBe(409);
});
