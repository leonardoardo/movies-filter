export interface IController {
    handler(req: any, reply: any): Promise<void>;
}
