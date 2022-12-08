import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RouteType } from 'src/app.service';
import { IS_PUBLIC_KEY } from 'src/auth/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
    ]);
    if (isPublic) {
        return true;
    }

    const {method, _parsedUrl: {path}} = context.getArgByIndex(0);
    const currentRoute = `${method} ${path.split('/').slice(0, 2).join('/')}` as RouteType;
    const { user: {role: {forbiddenRoutes}} } = context.switchToHttp().getRequest();
    
    console.log('user restrictions:', forbiddenRoutes)
    console.log('path:', currentRoute);
    console.log();

    if (!forbiddenRoutes.length) {
      // Admin case, when all routes are allowed
      return true
    }
    
    // TODO 1. check if current path name matches any names in the forbiddenRoutes array

    // TODO 2. check if current HTTP method matches any methods if 1. is true
    switch (currentRoute) {
      // case value:
        
    
      default:
        return false;
    }
  }
}