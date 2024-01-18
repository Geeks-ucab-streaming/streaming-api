import { IAudithRepository } from "src/common/domain/repositories/audit-repository";
import { AudithEntity } from "../entities/audith.entity";
import { Repository } from "typeorm";
import { DataSourceSingleton } from "../dataSourceSingleton";

 export class AudithRepositoryImpl
  extends Repository<AudithEntity>
  implements IAudithRepository
{
    constructor() {
        super(AudithEntity, DataSourceSingleton.getInstance().manager);
    }
    
    async addAudith(user_id: string, operation: string, data: string): Promise<void> {
        const audith = new AudithEntity();
        audith.User_id = user_id;
        audith.added_date = new Date(Date.now());
        audith.operation = operation;
        audith.data = data;
        await this.save(audith);
    }
}