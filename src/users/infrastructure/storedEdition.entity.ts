//Decoradores
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Check,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../infrastructure/users.entity';

@Entity('StoredEdition')
export class StoredEdition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  editionDate: Date;

  @Column()
  @Check(`fields IN ('email', 'name', 'birth_date', 'genders', 'phones')`)
  fields: string;

  @Column()
  oldValue: number;

  @Column()
  newValue: number;

  @ManyToOne(() => UserEntity, (user) => user.edition) //Se hace el cambio en la tabla de reportes por este decorador
  user: UserEntity;
}
