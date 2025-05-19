import { Injectable } from '@nestjs/common';
import { AerolineaEntity } from '../infraestructura/aerolinea.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../../../shared/errors/business-errors';
import { AeropuertoEntity } from '../../aeropuertos/infraestructura/aeropuerto.entity';

@Injectable()
export class AerolineasService {
  constructor(
    @InjectRepository(AerolineaEntity)
    private readonly aerolineasRepository: Repository<AerolineaEntity>,
  ) {}

  async findAll(): Promise<AerolineaEntity[]> {
    return await this.aerolineasRepository.find();
  }

  async findOne(aerolineaId: string): Promise<AerolineaEntity | null> {
    const aerolinea = await this.aerolineasRepository.findOne({
      where: [{ id: aerolineaId }],
      relations: {
        aeropuertos: true,
      },
    });

    if (!aerolinea) {
      throw new BusinessLogicException(
        'No existe la aerolinea',
        BusinessError.NOT_FOUND,
      );
    }

    return aerolinea;
  }

  async create(
    aerolinea: AerolineaEntity,
  ): Promise<AerolineaEntity | undefined> {
    const currentDate = new Date();
    const fechaFundacionDate = new Date(aerolinea.fechaFundacion);
    if (currentDate < fechaFundacionDate) {
      throw new BusinessLogicException(
        'Fecha de fundación de la aerolinea debe estar en el pasado',
        BusinessError.BAD_REQUEST,
      );
    }

    return await this.aerolineasRepository.save(aerolinea);
  }

  async update(
    aerolinea: AerolineaEntity,
  ): Promise<AerolineaEntity | undefined> {
    return this.aerolineasRepository.save(aerolinea);
  }

  async delete(aerolineaId: string) {
    const aerolinea = await this.findOne(aerolineaId);
    if (!aerolinea) {
      throw new BusinessLogicException(
        'No existe la aerolinea',
        BusinessError.BAD_REQUEST,
      );
    }

    await this.aerolineasRepository.delete({ id: aerolineaId });
  }

  async addAirportToAirline(aeropuerto: AeropuertoEntity, aerolineaId: string) {
    const aerolinea = await this.aerolineasRepository.findOne({
      where: [{ id: aerolineaId }],
      relations: {
        aeropuertos: true,
      },
    });

    if (!aerolinea) {
      throw new BusinessLogicException(
        'No existe la aerolinea',
        BusinessError.NOT_FOUND,
      );
    }

    if (aerolinea?.aeropuertos) {
      aerolinea.aeropuertos.push(aeropuerto);
    } else {
      aerolinea.aeropuertos = [aeropuerto];
    }

    const result = await this.aerolineasRepository.save(aerolinea);
    return result;
  }

  async findAirportsFromAirline(
    aerolineaId: string,
  ): Promise<AeropuertoEntity[]> {
    const aerolinea = await this.findOne(aerolineaId);
    return aerolinea?.aeropuertos ?? [];
  }

  async findAirportFromAirline(
    aerolineaId: string,
    aeropuertoId: string,
  ): Promise<AeropuertoEntity | null> {
    const aerolinea = await this.findOne(aerolineaId);
    return (
      aerolinea?.aeropuertos?.find(
        (aeropuerto) => aeropuerto.id === aeropuertoId,
      ) ?? null
    );
  }

  async updateAirportsFromAirline(
    aeropuertos: AeropuertoEntity[],
    aerolineaId: string,
  ) {
    const aerolinea = await this.aerolineasRepository.findOne({
      where: [{ id: aerolineaId }],
    });

    if (!aerolinea) {
      return;
    }

    aerolinea.aeropuertos = [...aeropuertos];

    return await this.aerolineasRepository.save(aerolinea);
  }

  async deleteAirportFromAirline(aeropuertoId: string, aerolineaId: string) {
    const aerolinea = await this.aerolineasRepository.findOne({
      where: [{ id: aerolineaId }],
    });

    if (!aerolinea) {
      return;
    }

    if (aerolinea?.aeropuertos?.length > 0) {
      aerolinea.aeropuertos = aerolinea?.aeropuertos.filter(
        (item) => item.id !== aeropuertoId,
      );
      await this.aerolineasRepository.save(aerolinea);
    }

    return null;
  }
}
