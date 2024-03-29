import { DataSource, Repository } from 'typeorm';
import { IgenericRepo } from 'src/phones/domain/generic-repo-phones';
import { PrefixEntity } from '../../../phones/infrastructure/entities/prefixes.entity';

export class OrmLineRepository extends Repository<PrefixEntity> implements IgenericRepo<string,PrefixEntity> {
  
  constructor(
    dataSource: DataSource
  ) {
    super(PrefixEntity, dataSource.manager);
    
  }
  async finderCriteria(prefix:string): Promise<PrefixEntity> {
    const phone = await this.createQueryBuilder("prefix")
    .leftJoinAndSelect("prefix.linePhone", "linePhone")
    .where("prefix.prefix = :prefix", { prefix: prefix })
    .getOne();
    return phone 
    
  }

}
