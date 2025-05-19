import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineaEntity } from './modules/aerolineas/infraestructura/aerolinea.entity';
import { AerolineasModule } from './modules/aerolineas/aerolineas.module';
import { AeropuertosModule } from './modules/aeropuertos/aeropuertos.module';
import { AerolineasService } from './modules/aerolineas/aplicacion/aerolineas.service';
import { AeropuertoEntity } from './modules/aeropuertos/infraestructura/aeropuerto.entity';
import { AerolineasController } from './modules/aerolineas/api/aerolineas.controller';
import { AeropuertosController } from './modules/aeropuertos/api/aeropuertos.controller';
import { AerolineasAeropuertosController } from './modules/aerolineas/api/aerolineas-aeropuertos.controller';

@Module({
  imports: [
    AerolineasModule,
    AeropuertosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'aerolineas-db',
      entities: [AerolineaEntity, AeropuertoEntity],
      dropSchema: true,
      synchronize: true,
    }),
  ],
  controllers: [
    AppController,
    AerolineasController,
    AeropuertosController,
    AerolineasAeropuertosController,
  ],
  providers: [AppService, AerolineasService],
})
export class AppModule {}
