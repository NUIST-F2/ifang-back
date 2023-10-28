import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextileService } from './textile/textile.service';
import { TextileModule } from './textile/textile.module';

@Module({
  imports: [TextileModule],
  controllers: [AppController],
  providers: [AppService, TextileService],
})
export class AppModule {}
