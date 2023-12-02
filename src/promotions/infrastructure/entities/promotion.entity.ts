import { Promotion } from 'src/promotions/domain/promotion';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Promotions' })
export class PromotionEntity {
  equals(other: Promotion): any {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false, unique: true })
  image_reference: string;
}
