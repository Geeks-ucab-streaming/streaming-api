import { DomainEvent } from "src/common/domain/Event/domain-event";
import { Promotion } from "../promotionAqqregate/promotion";
import { PromotionId } from "../promotionAqqregate/value-objects/promotionid-valueobject";
import { PromotionImageReference } from "../promotionAqqregate/value-objects/promocionImage-valueobject";

export class promotionCreatedEvent extends DomainEvent {

    constructor(
        public id : PromotionId,
        public image_reference: PromotionImageReference,
        ) {
        super();
    }

    static create(
        id: PromotionId,
        image_reference: PromotionImageReference,
    ): promotionCreatedEvent {
        return new promotionCreatedEvent(id, image_reference);
    }

    public getAggregateId(): PromotionId {
        return this.id;
    }
}