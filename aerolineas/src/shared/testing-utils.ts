import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineaEntity } from '../modules/aerolineas/infraestructura/aerolinea.entity';
import { AeropuertoEntity } from '../modules/aeropuertos/infraestructura/aeropuerto.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [
      // Add all your entities here
      // YourEntity
      AerolineaEntity,
      AeropuertoEntity,
    ],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([
    // Add all your repositories here
    // YourEntity
    AerolineaEntity,
    AeropuertoEntity,
  ]),
];
