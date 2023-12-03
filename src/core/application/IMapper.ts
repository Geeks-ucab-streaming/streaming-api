//D = DomainEntity; O = ormEntity
export interface Imapper<D, O> {
  domainToOrm(domainEntity: D): Promise<O>;
  ormToDomain(ormEntity: O): Promise<D>;
}
