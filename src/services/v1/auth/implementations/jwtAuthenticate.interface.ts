import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import AuthenticateDto from "../../../../dtos/auth/authenticate.dto";
import IUserRepository from "../../../../repositories/user/interfaces/user.repository";
import { TOKENS } from "../../../../shared/container/tokens";
import { InternalServerError } from "../../../../shared/errors/implementations/internalServerError";
import { UnauthorizedError } from "../../../../shared/errors/implementations/unauthorizedError";
import ICryptographyService from "../../cryptography/interfaces/cryptography.interface";
import IAuthenticateService, {
    AuthenticateResponse,
} from "../interfaces/authenticate.interface";

@injectable()
export default class JwtAuthenticationService implements IAuthenticateService {
    private readonly secretKey: string = process.env.JWT_SECRET || "jwtsecret";
    private readonly expiresIn: number =
        Number(process.env.JWT_EXPIRES_IN) || 3600000;

    constructor(
        @inject(TOKENS.IUserRepository)
        private readonly userRepository: IUserRepository,
        @inject(TOKENS.ICryptographyService)
        private readonly cryptographyService: ICryptographyService,
    ) {}

    async execute(
        authenticateData: AuthenticateDto,
    ): Promise<AuthenticateResponse> {
        const { email, password } = authenticateData;

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new InternalServerError("User not found");
        }

        if (
            !(await this.cryptographyService.compare(password, user.password))
        ) {
            throw new UnauthorizedError("Invalid password");
        }

        return {
            bearer: jwt.sign({ ...user }, this.secretKey, {
                expiresIn: this.expiresIn,
            }),
            expiresIn: this.expiresIn,
        };
    }
}
