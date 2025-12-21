import { zValidator } from '@hono/zod-validator';
import { describeRoute } from "hono-openapi";
import { config } from "../../../config/infrastructure/config.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint/Endpoint.ts";
import { RegisterUser } from "../../application/use-cases/RegisterUser.ts";
import { RegisterUserRequestDto } from "./dtos/RegisterUserRequestDto.ts";


export function RegisterUserEndpoint(registerUser: RegisterUser): Endpoint {
  return {
    method: "post",
    path: `${config.app.baseUrl}/users`,
    secured: false,
    handlers: [
      describeRoute({
        summary: "Creates a new User",
        description: "Allows to register a new User. The user provides an unique id, email, username, name and password. Upon succesfull registration, user is added into the system and can log-in",
        responses: {
          201: { description: "User created succesfully" },
        },
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  email: { type: "string" },
                  username: { type: "string" },
                  name: { type: "string" },
                  password: { type: "string" },
                },
                required: ["id", "email", "username", "name", "password"],
              },
            }
          }
        }
      }),
      zValidator("json", RegisterUserRequestDto),
      async (c) => {
        const { id, email, username, name, password } = c.req.valid("json")
        await registerUser.run(
          id,
          email,
          username,
          name,
          "https://example-picture.com",
          password,
          0,
          0,
          0,
          0,
          new Date()
        );
        c.status(201)
        return c.json({ message: "User created succesfully" });
      }
    ],
  };
}
