import { AggregateRoot } from 'src/common/domain/aggregate-root';
import { PromoCreatedEvent } from './event/PromoCreatedEvent';
import { PromoID } from './value-objects/PromoID-valueobject';
import { PromoImageReference } from './value-objects/PromoImageReference-valueobject';
import { DomainEvent } from 'src/common/domain/Event/domain-event';

export class Promotion extends AggregateRoot<PromoID> {
  protected when(event: DomainEvent): void {
    switch (event.constructor) {
      case PromoCreatedEvent:
        const promoCreated = event as PromoCreatedEvent;
        this.image_reference = promoCreated.image_reference;
        break;
      default:
        throw new Error('Event no fue implementado');
    }
  }
  protected ensureValidState(): void {
    if (!this.image_reference) throw new Error('Method not implemented.');
  }
  private image: Buffer | null;
  private image_reference: PromoImageReference;

  get Image_Reference(): string {
    return this.image_reference.Value;
  }

  get Image(): Buffer | null {
    return this.image;
  }

  public setImage(image: Buffer) {
    this.image = image;
  }

  protected constructor(id: PromoID, image_reference: PromoImageReference) {
    const promoCreated = PromoCreatedEvent.create(id, image_reference);
    super(id, promoCreated);
  }

  public static create(id: string, image_reference: string): Promotion {
    return new Promotion(
      PromoID.create(id),
      PromoImageReference.create(image_reference),
    );
  }
}
