import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PhoneEntity } from './phones.entity';
import { PrefixEntity } from './prefixes.entity';
import { Line } from '../domain/line';

@Entity('Lines')
export class LineEntity extends Line {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @OneToMany(() => PhoneEntity, (phones) => phones)
  phones: PhoneEntity[];

  @OneToMany(() => PrefixEntity, (prefixes) => prefixes)
  prefixes: PrefixEntity[];
}
