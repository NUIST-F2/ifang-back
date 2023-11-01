import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextileModule } from './textile/textile.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import{ConfigModule} from '@nestjs/config'


@Module({
  imports: [
    ConfigModule.forRoot(),TextileModule, TypeOrmModule.forRoot(
    {    
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.NAME,
    autoLoadEntities: true,
    synchronize: true,
  }

  ), UserModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

console.log(process.env)
