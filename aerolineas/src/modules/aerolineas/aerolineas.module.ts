import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineasController } from './api/aerolineas.controller';
import { AerolineasService } from './aplicacion/aerolineas.service';
import { AerolineaEntity } from './infraestructura/aerolinea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AerolineaEntity])],
  providers: [AerolineasService],
  controllers: [AerolineasController],
  exports: [TypeOrmModule, AerolineasService],
})
export class AerolineasModule {}
