import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
export function RoleGuard(allowedRoles: string[]): CanActivate {
  @Injectable()
  class RoleGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {

      const req: Request = context.switchToHttp().getRequest();
      const user = req?.user as JwtPayload
      if (!user) {
        throw new ForbiddenException('User not Authenticated');
      }
      if (!allowedRoles.includes(user.role as string)) {
        throw new ForbiddenException(
          `User role '${user.role}' does not have access`,
        );
      }
      return true;
    }
  }
  return new RoleGuard();
}
