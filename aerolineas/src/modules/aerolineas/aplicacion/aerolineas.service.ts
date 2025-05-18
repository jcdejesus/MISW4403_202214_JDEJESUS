import { Injectable } from '@nestjs/common';
import { AerolineaEntity } from '../infraestructura/aerolinea.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../../../shared/errors/business-errors';
import { AeropuertoEntity } from 'src/modules/aeropuertos/infraestructura/aeropuerto.entity';

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
    return await this.aerolineasRepository.findOne({
      where: [{ id: aerolineaId }],
    });
  }

  async create(
    aerolinea: AerolineaEntity,
  ): Promise<AerolineaEntity | undefined> {
    const currentDate = new Date();
    if (currentDate < aerolinea.fechaFundacion) {
      throw new BusinessLogicException(
        'Fecha de fundación de la aerolinea debe estar en el pasado',
        BusinessError.NOT_FOUND,
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
    await this.aerolineasRepository.delete({ id: aerolineaId });
  }

  async addAirportToAirline(aeropuerto: AeropuertoEntity, aerolineaId: string) {
    const aerolinea = await this.aerolineasRepository.findOne({
      where: [{ id: aerolineaId }],
    });

    if (!aerolinea) {
      return;
    }

    if (aerolinea?.aeropuertos) {
      aerolinea.aeropuertos.push(aeropuerto);
    } else {
      aerolinea.aeropuertos = [aeropuerto];
    }

    await this.aerolineasRepository.save(aerolinea);
  }
}
