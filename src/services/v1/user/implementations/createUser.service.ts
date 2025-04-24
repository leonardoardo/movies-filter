import { inject, injectable } from "tsyringe";
import IUserRepository from "../../../../repositories/user/interfaces/user.repository";
import { ICreateUserService } from "../interfaces/createUser.interface";
import { TOKENS } from "../../../../shared/container/tokens";

@injectable()
export default class CreateUserService implements ICreateUserService {
    constructor(
        @inject(TOKENS.IUserRepository)
        readonly repository: IUserRepository,
    ) {}

    async execute(userData: any): Promise<any> {
        if (!this.repository) {
            return new Error("Repository not initialized");
        }

        try {
            return await this.repository.create(userData);
        } catch (err) {
            console.error("Error creating user:", err);
            return new Error("Failed to create user");
        }
    }
}
