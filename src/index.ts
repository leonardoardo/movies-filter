import { config } from "dotenv";
config();

import "reflect-metadata";
import { registerDependencies } from "./shared/container";
registerDependencies();

import FastifyServer from "./server/implementations/fastify";
import { loadActiveRoutes } from "./routes/loadRoutes";

async function bootstrap() {
    const routes = await loadActiveRoutes();

    const HOST = process.env.HOST || "localhost";
    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

    const server = new FastifyServer(PORT, HOST);
    server.registerRoutes(routes);
    server.start();
}

bootstrap();
