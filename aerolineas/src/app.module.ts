import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineaEntity } from './modules/aerolineas/infraestructura/aerolinea.entity';
import { AerolineasModule } from './modules/aerolineas/aerolineas.module';
import { AeropuertosModule } from './modules/aeropuertos/aeropuertos.module';

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
      entities: [AerolineaEntity, AerolineaEntity],
      dropSchema: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
