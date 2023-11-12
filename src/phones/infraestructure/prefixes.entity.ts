import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { LineEntity } from './lines.entity';
import { Prefix } from '../domain/prefix';

@Entity('Prefixes')
export class PrefixEntity extends Prefix {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  prefix: number;

  @ManyToOne(() => LineEntity, (linePhone) => linePhone.prefixes)
  linePhone: LineEntity;
}
