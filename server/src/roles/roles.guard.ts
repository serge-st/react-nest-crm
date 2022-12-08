import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
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
    const currentPath = path.split('/').slice(0, 2).join('/');
    const currentFullRequest = `${method} ${currentPath}`;
    const { user: {role: {forbiddenRoutes}} } = context.switchToHttp().getRequest();
    
    // Admin case, when all routes are allowed
    if (!forbiddenRoutes.length) return true;

    // Case when exact request restriction is checked
    const index = forbiddenRoutes.findIndex(r => r.includes(currentPath));
    if (index < 0) return true;
    if (forbiddenRoutes[index] === currentFullRequest) return false;
  
    // Case when wildcard restriction is checked
    return !(forbiddenRoutes[index].split(' ')[0] === '*');
  }
}