import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Line } from './lines.entity';

@Entity()
export class Prefixes {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  prefix: number;

  @ManyToOne(() => Line, (linePhone) => linePhone.prefixes)
  linePhone: Line;
}
