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
import { AerolineasService } from '../aplicacion/aerolineas.service';
import { AerolineaEntity } from '../infraestructura/aerolinea.entity';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('airlines')
export class AerolineasController {
  constructor(private readonly aerolineasService: AerolineasService) {}

  @Get()
  async findAll(): Promise<AerolineaEntity[]> {
    return await this.aerolineasService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) aerolineaId: string,
  ): Promise<AerolineaEntity | null> {
    return await this.aerolineasService.findOne(aerolineaId);
  }

  @Post()
  async create(
    @Body() aerolinea: AerolineaEntity,
  ): Promise<AerolineaEntity | undefined> {
    return await this.aerolineasService.create(aerolinea);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) aerolineaId: string,
    @Body() aerolinea: AerolineaEntity,
  ): Promise<AerolineaEntity | undefined> {
    return await this.aerolineasService.update(aerolinea);
  }

  @Put(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) aerolineaId: string,
  ): Promise<void> {
    await this.aerolineasService.delete(aerolineaId);
  }
}
