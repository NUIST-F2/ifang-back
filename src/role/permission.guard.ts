import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());

    if (!requiredPermissions) {
      return true; // 没有标记权限的路由或方法默认允许访问
    }

    const userPermissions: string[] = ['read:user', 'write:user', 'fullAccess:admin','read:admin','write:admin'];

    const hasPermission = requiredPermissions.some((permission) => userPermissions.includes(permission));

    return hasPermission;
  }
}