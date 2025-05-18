import { AerolineaEntity } from 'src/modules/aerolineas/infraestructura/aerolinea.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

@Entity('aerolinea')
export class AeropuertoEntity extends BaseEntity {
  @Column()
  nombre: string;
  @Column()
  codigo: string;
  @Column()
  ciudad: string;
  @Column()
  pais: string;

  @ManyToMany(() => AerolineaEntity)
  @JoinTable()
  categories: AerolineaEntity[];
}
