import { Injectable } from '@nestjs/common';
import { AeropuertoEntity } from '../infraestructura/aeropuerto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../../../shared/errors/business-errors';

@Injectable()
export class AeropuertosService {
  constructor(
    @InjectRepository(AeropuertoEntity)
    private readonly aeropuertosRepository: Repository<AeropuertoEntity>,
  ) {}

  async findAll(): Promise<AeropuertoEntity[]> {
    return await this.aeropuertosRepository.find();
  }

  async findOne(aeropuertoId: string): Promise<AeropuertoEntity | null> {
    return await this.aeropuertosRepository.findOne({
      where: [{ id: aeropuertoId }],
    });
  }

  async create(
    aeropuerto: AeropuertoEntity,
  ): Promise<AeropuertoEntity | undefined> {
    if (aeropuerto.codigo.length > 3) {
      throw new BusinessLogicException(
        'El código de un aeropuerto debe ser de 3 digitos',
        BusinessError.NOT_FOUND,
      );
    }

    return await this.aeropuertosRepository.save(aeropuerto);
  }

  async update(
    aerolinea: AeropuertoEntity,
  ): Promise<AeropuertoEntity | undefined> {
    return this.aeropuertosRepository.save(aerolinea);
  }

  async delete(aerolineaId: string) {
    await this.aeropuertosRepository.delete({ id: aerolineaId });
  }
}
