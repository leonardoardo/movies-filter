import { config } from "dotenv";
config();

import "reflect-metadata";
import { registerDependencies } from "./shared/container";
registerDependencies();

import FastifyServer from "./server/implementations/fastify";

import { serverRoutesV1 } from "./routes/v1/server.routes";
import { usersRoutesV1 } from "./routes/v1/users.routes";

const routes = [...serverRoutesV1, ...usersRoutesV1];

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const server = new FastifyServer(PORT, HOST);
server.registerRoutes(routes);
registerDependencies();

server.start();
