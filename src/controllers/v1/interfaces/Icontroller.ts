import { IService } from "../../services/Iservice";

export interface IController {
    handler(req: any, reply: any): Promise<void>;
}
