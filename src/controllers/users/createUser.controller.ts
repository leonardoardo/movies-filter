import { FastifyReply, FastifyRequest } from "fastify";
import HttpStatus from "http-status";
import { IService } from "../../services/Iservice";
import ErrorMessage from "../../view/ErrorMessage";
import SuccessMessage from "../../view/successMessage";
import { IController } from "../Icontroller";


export default class CreateUserController implements IController {
    service: IService;

    constructor(service: IService) {
        this.service = service;
    }

    async handler(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const user = await this.service.execute(req.body)
            reply
            .code(HttpStatus.CREATED)
            .send(new SuccessMessage("User created successfully", user).create());
        } catch (error) {
            reply
            .code(HttpStatus.INTERNAL_SERVER_ERROR)
            .send(new ErrorMessage("Internal Server Error", error).create());
        }
    }
}