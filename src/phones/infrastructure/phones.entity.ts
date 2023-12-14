import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { LineEntity } from './lines.entity';
import { UserEntity } from '../../users/infrastructure/users.entity';
import { Line } from '../domain/value-objects/line';
import { PrefixEntity } from './prefixes.entity';

@Entity('Phones')
export class PhoneEntity  {
  static create(id: string, phoneNumber: number, linePhone: string): PhoneEntity {
    const phoneEntity = new PhoneEntity();
    phoneEntity.id = id;
    phoneEntity.phoneNumber = phoneNumber;
    phoneEntity.linePhone = new LineEntity();
    phoneEntity.linePhone.id = linePhone

    return phoneEntity;
  }
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