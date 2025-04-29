import { container } from "tsyringe";
import CreateUserControllerV1 from "../../controllers/v1/implementations/users/createUser.controller";
import { AuthGuard } from "../../guard/implementations/auth.guard";
import { IRoutes } from "../routes";

const createUserController = container.resolve(CreateUserControllerV1);

export const usersRoutesV1 = {
    activate: true,
    routes: [
        {
            method: "POST",
            url: "/api/v1/users/create",
            handler: async (req, reply) => {
                await createUserController.handler(req, reply);
            },
        },
        // {
        //     method: "PATCH",
        //     url: "/api/v1/users/update",
        //     handler: async (req, reply) => {
        //         const guard = new AuthGuard();
        //         await guard.handle(req, reply);
        //         await createUserController.handler(req, reply);
        //     },
        // },
    ],
} as IRoutes;
