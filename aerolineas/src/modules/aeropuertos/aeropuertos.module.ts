import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertoEntity } from './infraestructura/aeropuerto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AeropuertoEntity])],
})
export class AeropuertosModule {}
