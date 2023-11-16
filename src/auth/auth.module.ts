import { Module, SetMetadata } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
    imports:[UserModule,PassportModule,JwtModule.register({
        global:true,
        secret:jwConstants.secret,
        signOptions:{expiresIn:'60s'}
    }),TypeOrmModule.forFeature([User])],
    controllers:[AuthController],
    providers: [AuthService,LocalStategy,{
        provide:APP_GUARD,
        useClass:AuthGuard
    }],
    exports:[AuthService]
})
export class AuthModule {}
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY,true);