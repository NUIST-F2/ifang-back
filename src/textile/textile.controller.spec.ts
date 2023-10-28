import { Test, TestingModule } from '@nestjs/testing';
import { TextileController } from './textile.controller';

describe('TextileController', () => {
  let controller: TextileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextileController],
    }).compile();

    controller = module.get<TextileController>(TextileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
