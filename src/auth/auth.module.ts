import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwConstants } from './constants';

@Module({
    imports:[UserModule,PassportModule,JwtModule.register({
        global:true,
        secret:jwConstants.secret,
        signOptions:{expiresIn:'60s'}
    })],
    controllers:[AuthController],
    providers: [AuthService,LocalStategy],
    exports:[AuthService]
})
export class AuthModule {}
