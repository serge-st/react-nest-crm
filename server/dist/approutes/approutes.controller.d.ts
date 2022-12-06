import { Request as ExpressRequest } from "express";
import { AppRoutesService } from "./approutes.service";
export declare class AppRoutesController {
    private readonly appRoutesService;
    constructor(appRoutesService: AppRoutesService);
    getAppRoutes(req: ExpressRequest): string[];
}
