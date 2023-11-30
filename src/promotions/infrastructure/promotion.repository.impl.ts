import { Promotion } from "../domain/promotion";
import { IFindGenericRepository } from "src/common/domain/generic.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PromotionEntity } from "./entities/promotion.entity";

export class PromotionRepository implements IFindGenericRepository<Promotion> {
    constructor(
        @InjectRepository(PromotionEntity)
        private readonly repository: Repository<Promotion>,
    ) {}

    async findAll(): Promise<Promotion[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<Promotion> {
        return this.repository.findOne({ where: { id: id } });
    }
}