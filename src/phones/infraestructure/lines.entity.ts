import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PhoneEntity } from './phones.entity';
import { Prefixes } from './prefixes.entity';

@Entity()
export class Line {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => PhoneEntity, (phones) => phones)
  phones: PhoneEntity[];

  @OneToMany(() => Prefixes, (prefixes) => prefixes)
  prefixes: Prefixes[];
}
