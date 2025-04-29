import HealthCheckControllerV1 from "../../controllers/v1/implementations/server/healthCheck.controller";
import { IRoutes } from "../routes";

export const serverRoutesV1 = {
    activate: true,
    routes: [
        {
            method: "GET",
            url: "/api/v1/health",
            handler: new HealthCheckControllerV1().handler,
        },
    ],
} as IRoutes;
