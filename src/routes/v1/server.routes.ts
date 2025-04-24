import HealthCheckControllerV1 from "../../controllers/v1/implementations/server/healthCheck.controller";
import { IRoutes } from "../../server/interfaces/server";

export const serverRoutesV1 = [
    {
        method: "GET",
        url: "/api/v1/health",
        handler: new HealthCheckControllerV1().handler,
    },
] as IRoutes[];
