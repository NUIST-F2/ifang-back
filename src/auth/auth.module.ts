import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStategy } from './local.strategy';

@Module({
    imports:[UserModule,PassportModule],
    controllers:[AuthController],
    providers: [AuthService,LocalStategy],
})
export class AuthModule {}
