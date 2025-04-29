// src/guards/implementations/auth.guard.ts
import { IGuard } from "../interfaces/guard";
import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../shared/errors/implementations/unauthorizedError";

export class AuthGuard implements IGuard {
    async handle(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            reply.status(401).send({ message: "Unauthorized" });
            throw new UnauthorizedError("Unauthorized");
        }

        const token = authHeader.split(" ")[1];

        try {
            jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (error) {
            reply.status(401).send({ message: "Invalid token" });
            throw new UnauthorizedError("Invalid token");
        }
    }
}
