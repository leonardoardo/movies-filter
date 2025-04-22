import { FastifyReply, FastifyRequest } from "fastify";
import { IController } from "../Icontroller";

export default class HealthCheckController implements IController {
    async handler(req: FastifyRequest, res: FastifyReply): Promise<void> {
        try {
            res.send({ status: "ok" });
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
}
