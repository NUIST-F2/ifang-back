import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextileService } from './textile/textile.service';
import { TextileModule } from './textile/textile.module';

import { TextileController } from './textile/textile.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [TextileModule, UserModule, UserModule],
  controllers: [AppController, UserController,TextileController, UserController],
  providers: [AppService, TextileService, UserService, UserService],
})
export class AppModule {}
