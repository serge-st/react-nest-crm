import { Injectable } from '@nestjs/common';
import { Router, Request as ExpressRequest } from 'express';
import { HTTPMethod } from './http-method.enum';

export type RouteType = `${HTTPMethod} /${string}`; 

@Injectable()
export class AppService {
  
  getRoutes(req: ExpressRequest): RouteType[] {
    const router = req.app._router as Router;
    const appRoutes = router.stack
      .map(layer => {
        if (layer.route) {
            const path = layer.route?.path;
            const method = layer.route?.stack[0].method;
            return `${method.toUpperCase()} ${path}`
        }
      })
      .filter(item => !!item);

    return appRoutes as RouteType[];
  }

  // !! Experimental stuff below:
  getHello(): string {
    return 'Hello World!';
  }
}
