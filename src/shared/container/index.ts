import { container } from "tsyringe";
import MemoryUserRepository from "../../repositories/user/implementations/memoryUser.repository";
import MongooseUserRepository from "../../repositories/user/implementations/mongooseUser.repository";
import CreateUserService from "../../services/v1/user/implementations/createUser.service";
import { TOKENS } from "./tokens";
import BcryptCryptographyService from "../../services/v1/cryptography/implementations/bcryptCryptography.service";
import JwtAuthenticationService from "../../services/v1/auth/implementations/jwtAuthenticate.interface";

export function registerDependencies() {
    container.register(TOKENS.IUserCreateService, {
        useClass: CreateUserService,
    });

    container.register(TOKENS.ICryptographyService, {
        useClass: BcryptCryptographyService,
    });

    if (process.env.NODE_ENV === "test") {
        container.register(TOKENS.IUserRepository, {
            useClass: MemoryUserRepository,
        });
    } else {
        container.register(TOKENS.IUserRepository, {
            useFactory: () =>
                new MongooseUserRepository(
                    process.env.MONGO_URL || "",
                    container.resolve(TOKENS.ICryptographyService),
                ),
        });
    }

    container.register(TOKENS.IAuthenticateService, {
        useClass: JwtAuthenticationService,
    });
}
