import { validator } from "../../../shared/controllers/infrastructure/middlewares/Validator.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint/Endpoint.ts";
import { RegisterUser } from "../../application/use-cases/RegisterUser.ts";
import { CreateUserRequestDto } from "./dtos/CreateUserRequestDto.ts";

export function CreateUserEndpoint(registerUser: RegisterUser): Endpoint {
  return {
    method: "post",
    path: "/api/v1/users",
    secured: false,
    docs: {
      tags: ["Users"],
      summary: "Create a new user",
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
          },
        },
      },
      responses: {
        201: { description: "User created" },
      },
    },

    handlers: [
      validator("json", CreateUserRequestDto),
      async (req, res, next) => {
        try {
          const { id, email, username, name, password } = req.body;
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
          res.status(201).json({ message: "User created succesfully" });
        } catch (err) {
          next(err);
        }
      },
    ],
  };
}
