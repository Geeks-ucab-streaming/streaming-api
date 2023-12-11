/*import { DataSource, Repository } from 'typeorm';
import { ICreateRepository, IgenericRepo } from 'src/phones/domain/generic-repo-phones';
import { PrefixEntity } from '../prefixes.entity';

export class OrmLineRepository extends Repository<PrefixEntity> implements IgenericRepo<string,PrefixEntity> {
  
  constructor(
    dataSource: DataSource
  ) {
    super(PrefixEntity, dataSource.manager);
    
  }
  async finderCriteria(prefix:string): Promise<PrefixEntity> {
   
    const prefixito = await this.createQueryBuilder("prefix")
    .leftJoinAndSelect("prefix.linePhone", "linePhone")
    .where("prefix.prefix = :prefix", { prefix: prefix })
    .getOne();
    return prefixito 
  }

}
*/