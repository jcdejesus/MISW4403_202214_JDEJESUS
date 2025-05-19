import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertosController } from './api/aeropuertos.controller';
import { AeropuertosService } from './aplicacion/aeropuertos.service';
import { AeropuertoEntity } from './infraestructura/aeropuerto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AeropuertoEntity])],
  providers: [AeropuertosService],
  exports: [AeropuertosService],
  controllers: [AeropuertosController],
})
export class AeropuertosModule {}
