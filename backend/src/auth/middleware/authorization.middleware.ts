import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from "jsonwebtoken";
@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    const authHeaders = req.headers["authorization"];
    if (!authHeaders) {
      throw new UnauthorizedException("Not authorized")
    }
    const [, token] = authHeaders.split(" ");
    if (!token) {
      throw new UnauthorizedException("Invalid token")
    }
    try {
      const payload = jwt.verify(token, process.env.SECRET as string)
      req["user"] = payload;
    } catch (error) {
      if (error) {
        throw new UnauthorizedException("Invalid token")
      }
    }
    next();
  }
}
