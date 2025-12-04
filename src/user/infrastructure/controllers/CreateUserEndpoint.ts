import { validator } from "../../../shared/controllers/infrastructure/middlewares/Validator.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { RegisterUser } from "../../application/use-cases/RegisterUser.ts";
import { CreateUserRequestDto } from "./dtos/CreateUserRequestDTO.ts";

export function CreateUserEndpoint(registerUser: RegisterUser): Endpoint {
  return {
    method: "post",
    path: "/api/v1/users",
    handlers: [
      validator("json", CreateUserRequestDto),
      async (req, res) => {
        const { id, email, username, name, password } = req.body;
        registerUser.run(
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
        res.send("created con esito");
      },
    ],
  };
}
