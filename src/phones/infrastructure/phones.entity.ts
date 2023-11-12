import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { LineEntity } from './lines.entity';
import { UserEntity } from '../../users/infrastructure/users.entity';

@Entity('Phones')
export class PhoneEntity  {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: true })
  phoneNumber: number;

  @ManyToOne(() => LineEntity, (linePhone) => linePhone.phones)
  linePhone: LineEntity;

  @OneToOne(() => UserEntity, (user) => user.phone)
  user: UserEntity;
}
