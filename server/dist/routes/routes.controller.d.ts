import { Request as ExpressRequest } from "express";
export declare class RoutesController {
    getAppRoutes(req: ExpressRequest): {
        routes: string[];
    };
}
