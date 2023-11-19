import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwConstants } from "./constants";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from './auth.decorator';

const logger = new Logger('AuthGuard')
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService,
        private reflector: Reflector,) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {


        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {

            return true;
        }



        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            logger.error(`log failed, no token`)
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwConstants.secret
            });
            request['user'] = payload;
            logger.log(`log success token:${token}`)
        } catch {
            logger.log(`log success token:${token}`)
            throw new UnauthorizedException();
        }
        return true;

    }

    private extractTokenFromHeader(request: Request): string | undefined {//返回令牌使用
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;

    }
}