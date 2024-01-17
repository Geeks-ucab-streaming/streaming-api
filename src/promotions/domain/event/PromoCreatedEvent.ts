import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { DomainEvent } from 'src/common/domain/Event/domain-event';
import { PromoID } from '../value-objects/PromoID-valueobject';
import { PromoImageReference } from '../value-objects/PromoImageReference-valueobject';

export class PromoCreatedEvent extends DomainEvent {
  protected constructor(
    public id: PromoID,
    public image_reference: PromoImageReference,
  ) {
    super();
  }

  public static create(
    id: PromoID,
    image_reference: PromoImageReference,
  ): PromoCreatedEvent {
    return new PromoCreatedEvent(id, image_reference);
  }
}
