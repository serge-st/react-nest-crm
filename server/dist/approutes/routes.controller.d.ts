import { Request as ExpressRequest } from "express";
import { AppRoutesService } from "./routes.service";
export declare class AppRoutesController {
    private readonly appRoutesService;
    constructor(appRoutesService: AppRoutesService);
    getAppRoutes(req: ExpressRequest): void;
}
