import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { LineEntity } from './lines.entity';
import { UserEntity } from 'src/users/infraestructure/users.entity';
import { Phone } from '../domain/phone';

@Entity()
export class PhoneEntity extends Phone {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  phoneNumber: number;

  @ManyToOne(() => LineEntity, (linePhone) => linePhone.phones)
  linePhone: LineEntity;

  @OneToOne(() => UserEntity, (user) => user.phones)
  user: UserEntity;
}
