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

    it('debe poder retornar una aerolinea por su id', async () => {
      await service.create(aerolinea);
      const aerolineas = await service.findOne(aerolinea.id);
      expect(aerolineas).not.toBeNull();
    });

    it('debe poder crear una aerolinea', async () => {
      const result = await service.create(aerolinea);
      expect(result).not.toBeNull();
    });

    it('debe poder actualizar una aerolinea', async () => {
      const aerolineaToBeUpdated = {
        ...aerolinea,
        nombre: 'Actualizado',
      };
      await service.create(aerolinea);
      const result = await service.update(aerolineaToBeUpdated);
      expect(result?.nombre).toBe(aerolineaToBeUpdated.nombre);
    });

    it('debe poder eliminar una aerolinea', () => {});
  });
});
