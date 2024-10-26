import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Response } from 'express';
import { UserService } from '../user/user.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

export interface ExpressRequest extends Request {
  user?: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers['authorization'].split(' ')[1];
    try {
      const decode = verify(token, this.configService.get<string>('JWT_SECRET')) as { email: string };
      const user = await this.userService.findByEmail(decode.email);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}