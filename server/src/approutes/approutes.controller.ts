import { Controller, Get, Request } from "@nestjs/common";
import { Request as ExpressRequest } from "express";
import { AppRoutesService } from "./approutes.service";

@Controller('routes')
export class AppRoutesController {
    constructor(private readonly appRoutesService: AppRoutesService) {}

    @Get()
    getAppRoutes(@Request() req: ExpressRequest): string[] {
        return this.appRoutesService.getAppRouters(req);
    }
}
