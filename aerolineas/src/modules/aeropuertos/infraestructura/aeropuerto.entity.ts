import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

@Entity('aeropuerto')
export class AeropuertoEntity extends BaseEntity {
  @Column()
  nombre: string;
  @Column()
  codigo: string;
  @Column()
  ciudad: string;
  @Column()
  pais: string;
}
