import HealthCheckController from "../controllers/server/healthCheck.controller";
import { IRoutes } from "../server/server";

export const serverRoutes = [
    {
        method: "GET",
        url: "/health",
        handler: new HealthCheckController().handler,
    },
] as IRoutes[];
