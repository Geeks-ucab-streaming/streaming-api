//D = DomainEntity; O = Parameter Object
export interface Imapper<D, O> {
  domainTo(domainEntity: D): Promise<O>;
  ToDomain(ormEntity: O): Promise<D>;
}
