import { Container } from "inversify";
//import { MongoCommentRepository } from "./comment/infrastructure/repositories/MongoCommentRepository.ts";
import { Token } from "./config/domain/Token.ts";
import { createExpress } from "./shared/controllers/infrastructure/CreateExpress.ts";
import { errorMiddleware } from "./shared/controllers/infrastructure/middlewares/ErrorMiddleware.ts";
import { MongoModule } from "./shared/persistance/infrastructure/mongo/CreateMongoClient.ts";
import { BcryptPasswordHasher } from "./shared/services/bcrypt/infrastructure/BcryptPasswordHasher.ts";

export const container = new Container();

// Mongo
container.load(MongoModule);

// Repos
//container.bind(Token.COMMENT_REPOSITORY).toDynamicValue(MongoCommentRepository.create);

// Services
container.bind(Token.PASSWORD_HASHER).toDynamicValue(BcryptPasswordHasher.create);

// App
container.bind(Token.APP).toDynamicValue(createExpress);

// Middlewares
container.bind(Token.ERROR_MIDDLEWARE).toConstantValue(errorMiddleware);
