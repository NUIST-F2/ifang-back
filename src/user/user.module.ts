import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Profile } from 'src/entities/profile.entity';
import { Permission } from 'src/entities/permission.entity';

@Module({
    imports:[TypeOrmModule.forFeature([User,Profile,Permission])],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService],

})
export class UserModule {}
