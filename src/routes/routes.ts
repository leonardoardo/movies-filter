export interface IRoutes {
    activate: boolean;
    routes: {
        method: string;
        url: string;
        handler: (req: any, res: any) => Promise<void>;
    }[];
}
