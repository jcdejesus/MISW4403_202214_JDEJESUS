import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineasAeropuertosController } from './api/aerolineas-aeropuertos.controller';
import { AerolineasController } from './api/aerolineas.controller';
import { AerolineasService } from './aplicacion/aerolineas.service';
import { AerolineaEntity } from './infraestructura/aerolinea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AerolineaEntity])],
  providers: [AerolineasService],
  controllers: [AerolineasController, AerolineasAeropuertosController],
  exports: [TypeOrmModule, AerolineasService],
})
export class AerolineasModule {}
