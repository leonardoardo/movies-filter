import { inject, injectable } from "tsyringe";
import { DomainError } from "../../../../shared/errors/interface/error";
import ErrorMessage from "../../../../view/errorMessage";
import { IController } from "../../interfaces/Icontroller";
import HttpStatus from "http-status";
import { TOKENS } from "../../../../shared/container/tokens";
import IAuthenticateService from "../../../../services/v1/auth/interfaces/authenticate.interface";
import { FastifyReply, FastifyRequest } from "fastify";
import AuthenticateDto from "../../../../dtos/auth/authenticate.dto";
import SuccessMessage from "../../../../view/successMessage";

@injectable()
export default class AuthenticateController implements IController {
    constructor(
        @inject(TOKENS.IAuthenticateService)
        private readonly service: IAuthenticateService,
    ) {}

    async handler(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const { email, password } = req.body as AuthenticateDto;
            const auth = await this.service.execute({ email, password });

            reply
                .status(HttpStatus.CREATED)
                .send(
                    new SuccessMessage("Authentication success", auth).create(),
                );
        } catch (error: any) {
            console.log(error);
            if (error instanceof DomainError) {
                reply
                    .code(error.statusCode)
                    .send(new ErrorMessage(error.message, null).create());
            } else {
                reply
                    .code(HttpStatus.INTERNAL_SERVER_ERROR)
                    .send(new ErrorMessage("Unexxpected error", null).create());
            }
        }
    }
}
