import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { LineEntity } from './lines.entity';
import { UserEntity } from '../../../users/infrastructure/entities/users.entity';

@Entity('Phones')
export class PhoneEntity  {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bigint', nullable: true })
  phoneNumber: number;

  @ManyToOne(() => LineEntity, (linePhone) => linePhone.phones)
  @JoinColumn({ name: 'linePhoneId' })
  linePhone: LineEntity;
  @OneToOne(() => UserEntity, (user) => user.phone)
  user: UserEntity;
}
