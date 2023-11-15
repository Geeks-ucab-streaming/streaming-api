import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Promotions' })
export class PromotionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false, unique: true })
  image_reference: string;
}
