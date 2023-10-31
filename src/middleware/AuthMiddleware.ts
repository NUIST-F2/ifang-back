import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthController } from 'src/auth/auth.controller';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // 检查用户是否已登录
    if (!req.session || !req.session.user) {
      res.status(401).json({ message: '请先登录' });
      return;
    }

    // 用户已登录，继续处理请求
    next();
  }
}