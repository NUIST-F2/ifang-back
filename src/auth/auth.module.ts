import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from 'src/middleware/AuthMiddleware';

@Module({
    providers:[AuthMiddleware],
    controllers:[AuthController]
})
export class AuthModule {}
