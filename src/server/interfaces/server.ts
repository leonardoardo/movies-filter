export interface IRoutes {
    method: string;
    url: string;
    handler: (req: any, res: any) => Promise<void>;
}

export default interface IServer {
    port: number;
    host: string;
    routes: IRoutes[];
    server: any;

    start: () => void;
    registerRoutes: (routes: IRoutes[]) => void;
    listen: () => void;
    close?: () => void;
}
