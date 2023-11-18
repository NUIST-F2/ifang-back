import { Module } from '@nestjs/common';
import { TextileController } from './textile.controller';

@Module({
  controllers: [TextileController]
})
export class TextileModule { }
