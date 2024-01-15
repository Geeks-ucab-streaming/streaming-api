import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Audith')
export class AudithEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  User_id: string;

  @Column({ type: 'date', nullable: true })
  added_date: Date;

  @Column({ type: 'varchar', nullable: true })
  operation:string;

  @Column({ type: 'varchar', nullable: true })
  data:string;
}
