import { Injectable } from '@nestjs/common';
import { AerolineaEntity } from '../infraestructura/aerolinea.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
    return await this.aerolineasRepository.save(aerolinea);
  }

  async update(): Promise<AerolineaEntity | undefined> {
    return;
  }

  async delete(): Promise<AerolineaEntity | undefined> {
    return;
  }
}
