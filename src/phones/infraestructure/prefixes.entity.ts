import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { LineEntity } from './lines.entity';
import { Prefix } from '../domain/prefix';

@Entity()
export class PrefixEntity extends Prefix {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  prefix: number;

  @ManyToOne(() => LineEntity, (linePhone) => linePhone.prefixes)
  linePhone: LineEntity;
}
