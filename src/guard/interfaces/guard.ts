import { FastifyRequest, FastifyReply } from "fastify";

export interface IGuard {
    handle(req: FastifyRequest, reply: FastifyReply): Promise<void>;
}
