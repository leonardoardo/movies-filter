// src/controllers/v1/implementations/users/createUser.controller.ts
import { FastifyReply, FastifyRequest } from "fastify";
import HttpStatus from "http-status";
import ErrorMessage from "../../../../view/errorMessage";
import SuccessMessage from "../../../../view/successMessage";
import { IController } from "../../interfaces/Icontroller";
import { inject, injectable } from "tsyringe";
import { ICreateUserService } from "../../../../services/v1/user/interfaces/createUser.interface";
import CreateUserDTO from "../../../../dtos/users/createUser.dto";
import { TOKENS } from "../../../../shared/container/tokens";
import { DomainError } from "../../../../shared/errors/interface/error";

@injectable()
export default class CreateUserControllerV1 implements IController {
    constructor(
        @inject(TOKENS.IUserCreateService) readonly service: ICreateUserService,
    ) {}

    async handler(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const { name, email, password } = req.body as CreateUserDTO;

            const user = await this.service.execute({ email, name, password });

            reply
                .code(HttpStatus.CREATED)
                .send(
                    new SuccessMessage(
                        "User created successfully",
                        user,
                    ).create(),
                );
        } catch (error: any) {
            if (error instanceof DomainError) {
                reply
                    .code(error.statusCode)
                    .send(new ErrorMessage(error.message, null).create());
            } else {
                reply
                    .code(HttpStatus.INTERNAL_SERVER_ERROR)
                    .send(new ErrorMessage("Unexpected error", null).create());
            }
        }
    }
}
