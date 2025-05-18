import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../../../shared/testing-utils';
import { AerolineasService } from './aerolineas.service';
import { faker } from '@faker-js/faker';
import { AerolineaEntity } from '../infraestructura/aerolinea.entity';
import { Repository } from 'typeorm';

describe('AerolineasService', () => {
  let service: AerolineasService;
  let aerolinea = new AerolineaEntity();
  let repository: Repository<AerolineaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AerolineasService],
    }).compile();

    service = module.get<AerolineasService>(AerolineasService);

    aerolinea.id = faker.string.uuid();
    aerolinea.nombre = faker.lorem.paragraph(10);
    aerolinea.descripcion = faker.lorem.paragraph(10);
    aerolinea.fechaFundacion = faker.date.past({ years: 10 });
    aerolinea.sitioWeb = 'www.google.com';
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Buscar aerolineas', () => {
    it('debe retornar todas las aerolineas existentes', async () => {
      await service.create(aerolinea);
      const aerolineas = await service.findAll();
      expect(aerolineas.length).toBe(1);
    });
  });
});
