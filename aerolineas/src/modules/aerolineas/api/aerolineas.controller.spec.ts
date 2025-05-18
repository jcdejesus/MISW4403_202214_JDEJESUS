import { Test, TestingModule } from '@nestjs/testing';
import { AerolineasController } from './aerolineas.controller';

describe('AerolineasController', () => {
  let controller: AerolineasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AerolineasController],
    }).compile();

    controller = module.get<AerolineasController>(AerolineasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
