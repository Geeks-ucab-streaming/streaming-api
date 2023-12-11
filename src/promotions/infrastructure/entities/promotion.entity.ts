import { Promotion } from 'src/promotions/domain/promotionAqqregate/promotion';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Promotions' })
export class PromotionEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false, unique: true })
  image_reference: string;

  static async create(
    id: string,
    image_reference: string,
  ): Promise<PromotionEntity> {
    const promotion = new PromotionEntity();
    promotion.id = id;
    promotion.image_reference = image_reference;
    return promotion;
  }
}
