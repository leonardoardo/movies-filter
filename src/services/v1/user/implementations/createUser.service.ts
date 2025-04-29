// src/services/v1/user/implementations/createUser.service.ts
import { inject, injectable } from "tsyringe";
import IUserRepository from "../../../../repositories/user/interfaces/user.repository";
import { ICreateUserService } from "../interfaces/createUser.interface";
import { TOKENS } from "../../../../shared/container/tokens";
import CreateUserDTO from "../../../../dtos/users/createUser.dto";
import { UserAlreadyExistsError } from "../../../../shared/errors/implementations/userAlreadyExistError";
import { InternalServerError } from "../../../../shared/errors/implementations/internalServerError";

@injectable()
export default class CreateUserService implements ICreateUserService {
    constructor(
        @inject(TOKENS.IUserRepository)
        readonly userRepository: IUserRepository,
    ) {}

    async execute(userData: CreateUserDTO): Promise<any> {
        if (!this.userRepository) {
            throw new InternalServerError("Repository not initialized");
        }

        const user = await this.userRepository.create(userData);
        if (!user) {
            throw new UserAlreadyExistsError();
        }
        return user;
    }
}
