import { Container } from "inversify";
import { MongoModule } from "./shared/persistance/infrastructure/mongo/CreateMongoClient";
import { MongoCommentRepository } from "./comment/infrastructure/repositories/MongoCommentRepository";
import { Token } from "./config/domain/Token";
import { BcryptPasswordHasher } from "./shared/services/bcrypt/infrastructure/BcryptPasswordHasher";

export const container = new Container();

// Mongo
container.load(MongoModule)

// Repos
container.bind(Token.COMMENT_REPOSITORY).toDynamicValue(MongoCommentRepository.create)

// Services
container.bind(Token.PASSWORD_HASHER).toDynamicValue(BcryptPasswordHasher.create)