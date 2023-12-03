import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { LineEntity } from './lines.entity';
import { Prefix } from '../domain/value-objects/prefix';

@Entity('Prefixes')
export class PrefixEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: true })
  prefix: number;

  @ManyToOne(() => LineEntity, (linePhone) => linePhone.prefixes)
  linePhone: LineEntity;
}
