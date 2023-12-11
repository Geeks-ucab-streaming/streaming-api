import { Promotion } from "src/promotions/domain/promotionAqqregate/promotion";
import { PromotionEntity } from "../entities/promotion.entity";
import { GetFileService } from "src/common/infrastructure/services/getFile.service";
import { Imapper } from "src/core/application/IMapper";
import { PromotionId } from "src/promotions/domain/promotionAqqregate/value-objects/promotionid-valueobject";
import { PromotionImageReference } from "src/promotions/domain/promotionAqqregate/value-objects/promocionImage-valueobject";

export class PromotionMapper implements Imapper<Promotion , PromotionEntity>{
    private readonly getPromotionImageService: GetFileService;

    constructor(){
        this.getPromotionImageService = new GetFileService(
            process.env.PROMOTION_IMAGES_CONTAINER 
        );
    }

    // TODO: Implementar el metodo para convertir de orm a dominio
    async ormToDomain(ormEntity: PromotionEntity): Promise<Promotion> {
        if(!ormEntity) 
            return null;
        let promotion: Promotion = Promotion.create(
            PromotionId.create(ormEntity.id),
            PromotionImageReference.create(ormEntity.image_reference)
        );
        promotion.setImage(
            await this.getPromotionImageService.execute(promotion.ImageReference.Value));
        return promotion;
    }

    // TODO: Implementar el metodo para convertir de dominio a orm
    async domainToOrm(ormEntity: Promotion): Promise<PromotionEntity> {
        if(!ormEntity) 
            return null;
        let promotionEntity: PromotionEntity = await PromotionEntity.create(
            ormEntity.Id.toString(),
            ormEntity.ImageReference.toString()
        );
        return promotionEntity;
    }
}