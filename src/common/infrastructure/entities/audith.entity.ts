import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

console.log('probando audith entity');
@Entity('Audith')
export class AudithEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  User_id: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  added_date: Date;

  @Column({ type: 'varchar', nullable: true })
  operation: string;

  @Column({ type: 'varchar', nullable: true })
  data: string;
}
