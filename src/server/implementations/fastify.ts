import fastify, { FastifyInstance } from "fastify";
import IServer, { Routes } from "../interfaces/server";
import { IRoutes } from "../../routes/routes";
import chalk from "chalk";

export default class FastifyServer implements IServer {
    port: number;
    host: string;
    routes: Routes;
    server: FastifyInstance;

    constructor(port: number, host?: string) {
        this.port = port;
        this.host = host || "localhost";
        this.routes = [];
        this.server = fastify({ logger: false });
    }

    start() {
        this.listen();
    }

    registerRoutes(routes: Routes) {
        this.routes = routes;
        for (const route of routes) {
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
                    console.error(
                        chalk.bold.red(`❌ Server failed to start:`),
                        err,
                    );
                    process.exit(1);
                }
                console.log(
                    chalk.bold.green(`🚀 Server is running at:`),
                    chalk.underline.blue(address),
                );
            },
        );
    }

    close() {
        this.server
            .close()
            .then(() => {
                console.log(chalk.bold.yellow("🛑 Server closed gracefully"));
            })
            .catch((err) => {
                console.error(
                    chalk.bold.red("❌ Error while closing server:"),
                    err,
                );
            });
    }
}
