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
    const aeropuerto = await this.aeropuertosRepository.findOne({
      where: [{ id: aeropuertoId }],
    });

    if (!aeropuerto) {
      throw new BusinessLogicException(
        'No existe el aeropuerto',
        BusinessError.NOT_FOUND,
      );
    }

    return aeropuerto;
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
    aeropuerto: AeropuertoEntity,
  ): Promise<AeropuertoEntity | undefined> {
    const aeropuertoEnBD = await this.findOne(aeropuerto.id);
    if (!aeropuertoEnBD) {
      throw new BusinessLogicException(
        'No existe el aeropuerto',
        BusinessError.BAD_REQUEST,
      );
    }
    return await this.aeropuertosRepository.save(aeropuerto);
  }

  async delete(aeropuertoId: string) {
    const aeropuertoEnBD = await this.findOne(aeropuertoId);
    if (!aeropuertoEnBD) {
      throw new BusinessLogicException(
        'No existe el aeropuerto',
        BusinessError.BAD_REQUEST,
      );
    }
    await this.aeropuertosRepository.delete({ id: aeropuertoId });
  }
}
