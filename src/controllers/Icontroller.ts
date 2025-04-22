export interface IController {
    interceptor?: any;
    handler(req: any, reply: any): Promise<void>;
}
