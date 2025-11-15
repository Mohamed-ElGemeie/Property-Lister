import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader =
      req.headers['authorization'] || req.headers['Authorization'];

    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('Unauthorized');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || token !== process.env.SECRET) {
      throw new UnauthorizedException('Unauthorized');
    }

    next();
  }
}
