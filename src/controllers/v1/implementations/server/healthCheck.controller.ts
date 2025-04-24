import { FastifyReply, FastifyRequest } from "fastify";
import { IController } from "../../interfaces/Icontroller";

export default class HealthCheckControllerV1 implements IController {
    async handler(req: FastifyRequest, res: FastifyReply): Promise<void> {
        try {
            res.send({ status: "ok" });
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
}
