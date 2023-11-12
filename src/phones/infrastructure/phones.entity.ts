import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { LineEntity } from './lines.entity';
import { UserEntity } from '../../users/infrastructure/users.entity';
import { Phone } from '../domain/phone';

@Entity('Phones')
export class PhoneEntity extends Phone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  phoneNumber: number;

  @ManyToOne(() => LineEntity, (linePhone) => linePhone.phones)
  linePhone: LineEntity;

  @OneToOne(() => UserEntity, (user) => user.phones)
  user: UserEntity;
}
