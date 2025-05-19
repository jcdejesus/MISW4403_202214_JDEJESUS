import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AeropuertoEntity } from 'src/modules/aeropuertos/infraestructura/aeropuerto.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { AerolineasService } from '../aplicacion/aerolineas.service';
import { AerolineaEntity } from '../infraestructura/aerolinea.entity';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('airlines')
export class AerolineasAeropuertosController {
  constructor(private readonly aerolineasService: AerolineasService) {}

  @Get(':id/airports/:aeropuertoid')
  async findAirportsFromAirline(
    @Param('id', new ParseUUIDPipe()) aerolineaId: string,
  ): Promise<AeropuertoEntity[]> {
    return await this.aerolineasService.findAirportsFromAirline(aerolineaId);
  }

  @Get(':id/airports/:aeropuertoid')
  async findAirportFromAirline(
    @Param('id', new ParseUUIDPipe()) aerolineaId: string,
    @Param('aeropuertoid', new ParseUUIDPipe()) aeropuertoId: string,
  ): Promise<AeropuertoEntity | null> {
    return await this.aerolineasService.findAirportFromAirline(
      aerolineaId,
      aeropuertoId,
    );
  }

  @Delete(':id/airports/:aeropuertoid')
  async deleteAirportFromAirline(
    @Param('id', new ParseUUIDPipe()) aerolineaId: string,
    @Param('aeropuertoid', new ParseUUIDPipe()) aeropuertoId: string,
  ): Promise<void> {
    await this.aerolineasService.deleteAirportFromAirline(
      aeropuertoId,
      aerolineaId,
    );
  }

  @Post(':id/airports/:aeropuertoid')
  async addAirportToAirline(
    @Param('id', new ParseUUIDPipe()) aerolineaId: string,
    @Param('aeropuertoid', new ParseUUIDPipe()) aeropuertoId: string,
    @Body() aeropuerto: AeropuertoEntity,
  ): Promise<AerolineaEntity | undefined> {
    return await this.aerolineasService.addAirportToAirline(
      aeropuerto,
      aerolineaId,
    );
  }

  @Put(':id/airports/:aeropuertoid')
  async updateAirportsFromAirline(
    @Param('id', new ParseUUIDPipe()) aerolineaId: string,
    @Param('aeropuertoid', new ParseUUIDPipe()) aeropuertoId: string,
    @Body() aeropuertos: AeropuertoEntity[],
  ): Promise<AerolineaEntity | undefined> {
    return await this.aerolineasService.updateAirportsFromAirline(
      aeropuertos,
      aerolineaId,
    );
  }
}
