import { UserNotFoundByIdError } from "../errors/UserNotFoundByIdError"
import { UserRepository } from "../repositories/UserRepository"
import { UserId } from "../value-objects/UserId"

export class UserFinder {
  constructor(private UserRepository: UserRepository) {}
  
  async findById(id: string) {
    const user = await this.UserRepository.getOneById(new UserId(id))
    if(!user) throw new UserNotFoundByIdError(id)
    return user
  }
}