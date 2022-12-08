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
    const { user } = context.switchToHttp().getRequest();
    
    console.log('user:', user.role.forbiddenRoutes)
    console.log('path:', currentRoute);

    // !! should return false if actual path matches forbiddenRoutes in JWTPayload
    return true;
  }
}