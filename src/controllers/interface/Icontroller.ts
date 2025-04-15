import { FastifyReply, FastifyRequest } from "fastify";

export interface IController {
    handler(req: FastifyRequest, reply: FastifyReply): Promise<void>;
}