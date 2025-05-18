import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertosService } from '../aeropuertos/aplicacion/aeropuertos.service';
import { AerolineaEntity } from './infraestructura/aerolinea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AerolineaEntity])],
  providers: [AeropuertosService],
})
export class AerolineasModule {}
