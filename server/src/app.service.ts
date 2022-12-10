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
    
    const sortedResult = appRoutes.map(r => r.split(' '))
      .sort((a, b) => {
        const aRoute = a[1].toLocaleLowerCase();
        const bRoute = b[1].toLocaleLowerCase();

        if (aRoute < bRoute) return -1;
        if (aRoute > bRoute) return 1;
        return 0;
      })
      .map(r => r.join(' '));
    
    return sortedResult as RouteType[];
  }

  // !! Experimental stuff below:
  getHello(): string {
    return 'Hello World!';
  }
}
