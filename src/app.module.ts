import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextileService } from './textile/textile.service';
import { TextileModule } from './textile/textile.module';
import { LoggingService } from './logging/logging.service';
import { LoggingController } from './logging/logging.controller';
import { LoggingModule } from './logging/logging.module';
import { TextileController } from './textile/textile.controller';

@Module({
  imports: [TextileModule, LoggingModule],
  controllers: [AppController, LoggingController,TextileController],
  providers: [AppService, TextileService, LoggingService],
})
export class AppModule {}
