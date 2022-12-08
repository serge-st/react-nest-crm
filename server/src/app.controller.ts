import { Controller, Get, Req, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JWTAuthGuard } from './auth/jwt-auth.guard';
import { Request as ExpressRequest } from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('approutes')
  getRoutes(@Request() req: ExpressRequest): string[] {
      return this.appService.getRoutes(req);
  }

  // !! Experimental stuff below:
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JWTAuthGuard)
  @Get('/protected')
  getHelloProtected(@Req() req): string {
    console.log(req)
    return this.appService.getHello();
  }

  @Get('/admin-only')
  getAdminProtectRoute(): string {
    return `Hello Admin!`
  }
}
