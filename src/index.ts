import { serverRoutes } from "./routes/server.routes";
import FastifyServer from "./server/fastify";

const routes = [...serverRoutes];

const server = new FastifyServer(3000, "localhost");
server.registerRoutes(routes);

server.start();
