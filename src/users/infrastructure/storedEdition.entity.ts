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

  @Column({ type: 'date', nullable: false })
  editionDate: Date;

  @Column({ type: 'text', nullable: true })
  @Check(`fields IN ('email', 'name', 'birth_date', 'gender', 'phones')`)
  fields: string;

  @Column({ type: 'text', nullable: true })
  oldValue: string;

  @Column({ type: 'text', nullable: true })
  newValue: string;

  @ManyToOne(() => UserEntity, (user) => user.edition) //Se hace el cambio en la tabla de reportes por este decorador
  user: UserEntity;
}
