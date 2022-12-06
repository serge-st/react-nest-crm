import { Injectable } from '@nestjs/common';
import { Router, Request as ExpressRequest } from 'express';

@Injectable()
export class AppRoutesService {
    getAppRouters(req: ExpressRequest): string[] {
        const router = req.app._router as Router;
        return router.stack
            .map(layer => {
                if (layer.route) {
                    const path = layer.route?.path;
                    const method = layer.route?.stack[0].method;
                    return `${method.toUpperCase()} ${path}`
                }
            })
            .filter(item => !!item)
    }
}
