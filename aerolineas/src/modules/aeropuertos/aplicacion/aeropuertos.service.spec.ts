import { Test, TestingModule } from '@nestjs/testing';
import { AeropuertosService } from './aeropuertos.service';
import { TypeOrmTestingConfig } from '../../../shared/testing-utils';
import { AeropuertoEntity } from '../infraestructura/aeropuerto.entity';
import { faker } from '@faker-js/faker';

describe('AeropuertosService', () => {
  let service: AeropuertosService;
  let aeropuerto: AeropuertoEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AeropuertosService],
    }).compile();

    service = module.get<AeropuertosService>(AeropuertosService);

    aeropuerto = new AeropuertoEntity();
    aeropuerto.id = faker.string.uuid();
    aeropuerto.nombre = faker.lorem.paragraph(10);
    aeropuerto.codigo = faker.number.int(2).toString();
    aeropuerto.ciudad = faker.location.city();
    aeropuerto.pais = faker.location.country();
  });

  it('Servicio debe poder compilar', () => {
    expect(service).toBeDefined();
  });

  describe('Aeropuertos', () => {
    it('debe retornar todas los aeropuertos existentes', async () => {
      await service.create(aeropuerto);
      const aeropuertos = await service.findAll();
      expect(aeropuertos.length).toBe(1);
    });

    it('debe poder retornar un aeropuerto por su id', async () => {
      await service.create(aeropuerto);
      const result = await service.findOne(aeropuerto.id);
      expect(result).not.toBeNull();
    });

    it('debe poder crear un aeropuerto', async () => {
      const result = await service.create(aeropuerto);
      expect(result).not.toBeNull();
    });

    it('debe poder actualizar un aeropuerto', async () => {
      const aeropuertoToBeUpdated = {
        ...aeropuerto,
        nombre: 'Actualizado',
      };
      await service.create(aeropuerto);
      const result = await service.update(aeropuertoToBeUpdated);
      expect(result?.nombre).toBe(aeropuertoToBeUpdated.nombre);
    });

    it('debe poder eliminar una aeropuerto', async () => {
      await service.create(aeropuerto);
      await service.delete(aeropuerto.id);
      expect(async () => await service.findOne(aeropuerto.id)).rejects.toEqual({
        message: 'No existe el aeropuerto',
        type: 0,
      });
    });
  });
});
