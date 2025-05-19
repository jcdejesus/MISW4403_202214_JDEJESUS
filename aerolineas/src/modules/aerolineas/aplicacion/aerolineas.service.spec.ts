import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../../../shared/testing-utils';
import { AerolineasService } from './aerolineas.service';
import { faker } from '@faker-js/faker';
import { AerolineaEntity } from '../infraestructura/aerolinea.entity';
import { AeropuertoEntity } from '../../aeropuertos/infraestructura/aeropuerto.entity';
import { AeropuertosService } from '../../aeropuertos/aplicacion/aeropuertos.service';

describe('AerolineasService', () => {
  let service: AerolineasService;
  let aeropuertosService: AeropuertosService;
  let aerolinea = new AerolineaEntity();
  let aeropuerto = new AeropuertoEntity();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AerolineasService, AeropuertosService],
    }).compile();

    service = module.get<AerolineasService>(AerolineasService);
    aeropuertosService = module.get<AeropuertosService>(AeropuertosService);

    aerolinea.id = faker.string.uuid();
    aerolinea.nombre = faker.lorem.paragraph(10);
    aerolinea.descripcion = faker.lorem.paragraph(10);
    aerolinea.fechaFundacion = faker.date.past({ years: 10 });
    aerolinea.sitioWeb = 'www.google.com';
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

  describe('Aerolineas', () => {
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

    it('debe poder eliminar una aerolinea', async () => {
      await service.create(aerolinea);
      await service.delete(aerolinea.id);
      expect(async () => {
        await service.findOne(aerolinea.id);
      }).rejects.toEqual({ message: 'No existe la aerolinea', type: 0 });
    });
  });

  describe('Aerolineas - Aeropuertos', () => {
    it('debe asociar un aeropuerto a una aerolinea', async () => {
      await service.create(aerolinea);
      await aeropuertosService.create(aeropuerto);
      const result = await service.addAirportToAirline(
        aeropuerto,
        aerolinea.id,
      );
      expect(result).not.toBeNull();
    });

    it('debe encontrar los aeropuertos de una aerolinea', async () => {
      await service.create(aerolinea);
      await aeropuertosService.create(aeropuerto);
      await service.addAirportToAirline(aeropuerto, aerolinea.id);
      const aeropuertos = await service.findAirportsFromAirline(aerolinea.id);
      expect(aeropuertos.length).toEqual(1);
    });

    it('debe encontrar un aeropuerto de una aerolinea', async () => {
      await service.create(aerolinea);
      await aeropuertosService.create(aeropuerto);
      await service.addAirportToAirline(aeropuerto, aerolinea.id);
      const aeropuertoFromDatabase = await service.findAirportFromAirline(
        aerolinea.id,
        aeropuerto.id,
      );
      expect(aeropuertoFromDatabase).toEqual(aeropuerto);
    });

    it('debe eliminar un aeropuerto de una aerolinea', async () => {
      await service.create(aerolinea);
      await aeropuertosService.create(aeropuerto);
      await service.deleteAirportFromAirline(aeropuerto.id, aerolinea.id);
      const aeropuertoFromDatabase = await service.findAirportFromAirline(
        aerolinea.id,
        aeropuerto.id,
      );
      expect(aeropuertoFromDatabase).toBeNull();
    });

    it('debe actualizar un aeropuerto de una aerolinea', async () => {
      await service.create(aerolinea);
      await aeropuertosService.create(aeropuerto);
      await service.addAirportToAirline(aeropuerto, aerolinea.id);
      const updatedAirport = {
        ...aeropuerto,
        nombre: 'Actualizado',
      };
      const result = await service.updateAirportsFromAirline(
        [updatedAirport],
        aerolinea.id,
      );
      expect(result).not.toBeNull();
    });
  });
});
