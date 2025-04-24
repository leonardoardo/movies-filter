import { FastifyReply, FastifyRequest } from "fastify";
import HttpStatus from "http-status";
import ErrorMessage from "../../../../view/errorMessage";
import SuccessMessage from "../../../../view/successMessage";
import { IController } from "../../interfaces/Icontroller";
import { inject, injectable } from "tsyringe";
import { ICreateUserService } from "../../../../services/v1/user/interfaces/createUser.interface";
import CreateUserDTO from "../../../../dtos/users/createUser.dto";
import { TOKENS } from "../../../../shared/container/tokens";

@injectable()
export default class CreateUserControllerV1 implements IController {
    constructor(
        @inject(TOKENS.IUserCreateService) readonly service: ICreateUserService,
    ) {}

    async handler(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const { name, email, password } = req?.body as CreateUserDTO;

            const user = await this.service.execute({ email, name, password });
            reply
                .code(HttpStatus.CREATED)
                .send(
                    new SuccessMessage(
                        "User created successfully",
                        user,
                    ).create(),
                );
        } catch (error) {
            reply
                .code(HttpStatus.INTERNAL_SERVER_ERROR)
                .send(
                    new ErrorMessage("Internal Server Error", error).create(),
                );
        }
    }
}
