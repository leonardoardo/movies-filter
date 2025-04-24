import { container } from "tsyringe";
import CreateUserControllerV1 from "../../controllers/v1/implementations/users/createUser.controller";
import { IRoutes } from "../../server/interfaces/server";

export const usersRoutesV1 = [
    {
        method: "POST",
        url: "/api/v1/users/create",
        handler: container
            .resolve(CreateUserControllerV1)
            .handler.bind(container.resolve(CreateUserControllerV1)),
    },
] as IRoutes[];
