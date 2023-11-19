import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextileModule } from './textile/textile.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { CorsMiddleware } from '@nest-middlewares/cors';
@Module({
  imports: [
    ConfigModule.forRoot(), TextileModule, TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
      }

    ), UserModule, UserModule, AuthModule, 
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('http:/localhost:5173');


}
}
