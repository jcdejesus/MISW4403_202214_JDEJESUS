import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { AeropuertosService } from '../aplicacion/aeropuertos.service';
import { AeropuertoEntity } from '../infraestructura/aeropuerto.entity';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('airports')
export class AeropuertosController {
  constructor(private readonly aeropuertoService: AeropuertosService) {}

  @Get()
  async findAll(): Promise<AeropuertoEntity[]> {
    return await this.aeropuertoService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) aeropuertoId: string,
  ): Promise<AeropuertoEntity | null> {
    return await this.aeropuertoService.findOne(aeropuertoId);
  }

  @Post()
  async create(
    @Body() aeroopuerto: AeropuertoEntity,
  ): Promise<AeropuertoEntity | undefined> {
    return await this.aeropuertoService.create(aeroopuerto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) aerolineaId: string,
    @Body() aeropuerto: AeropuertoEntity,
  ): Promise<AeropuertoEntity | undefined> {
    return await this.aeropuertoService.update(aeropuerto);
  }

  @Put(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) aeropuertoId: string,
  ): Promise<void> {
    await this.aeropuertoService.delete(aeropuertoId);
  }
}
