import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

@Entity('aerolinea')
export class AerolineaEntity extends BaseEntity {
  @Column()
  nombre: string;
  @Column()
  descripcion: string;
  @Column()
  fechaFundacion: Date;
  @Column()
  sitioWeb: string;
}
