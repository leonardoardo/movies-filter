import { serverRoutes } from "./routes/server.routes";
import FastifyServer from "./server/fastify";

const routes = [...serverRoutes];

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const server = new FastifyServer(PORT, HOST);
server.registerRoutes(routes);

server.start();
