import { container } from "tsyringe";
import AuthenticateController from "../../controllers/v1/implementations/auth/authenticate.controller";
import { IRoutes } from "../routes";

export const authRoutesV1 = {
    activate: true,
    routes: [
        {
            method: "POST",
            url: "/api/v1/auth",
            handler: container
                .resolve(AuthenticateController)
                .handler.bind(container.resolve(AuthenticateController)),
        },
    ],
} as IRoutes;
