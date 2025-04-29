import { IRoutes } from "../../routes/routes";

export type Routes = IRoutes["routes"];

export default interface IServer {
    port: number;
    host: string;
    routes: Routes;
    server: any;

    start: () => void;
    registerRoutes: (routes: Routes) => void;
    listen: () => void;
    close?: () => void;
}
