import fastify, { FastifyInstance } from "fastify";
import IServer, { IRoutes } from "./server";

export default class FastifyServer implements IServer {
    port: number;
    host: string;
    routes: IRoutes[];
    server: FastifyInstance;

    constructor(port: number, host?: string) {
        this.port = port;
        this.host = host || "localhost";
        this.routes = [];
        this.server = fastify({ logger: true });
    }

    start() {
        this.listen();
    }

    registerRoutes(routes: IRoutes[]) {
        this.routes = routes;
        for (const route of routes) {
            console.log("🚀 ~ FastifyServer ~ registerRoutes ~ route:", route);
            this.server.route({
                method: route.method,
                url: route.url,
                handler: route.handler,
            });
        }
    }

    listen() {
        this.server.listen(
            { port: this.port, host: this.host },
            (err, address) => {
                if (err) {
                    this.server.log.error(err);
                    process.exit(1);
                }
                this.server.log.info(`Server listening at ${address}`);
            },
        );
    }

    close() {
        this.server
            .close()
            .then(() => {
                this.server.log.info("Server closed");
            })
            .catch((err) => {
                this.server.log.error(err);
            });
    }
}
