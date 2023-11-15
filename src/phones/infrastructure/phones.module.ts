import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhoneEntity } from "../../phones/infrastructure/entities/phones.entity";
import { PhonesService } from "../application/services/phones.service";
import { UsersModule } from "../../users/infrastructure/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([PhoneEntity]), UsersModule],
  controllers: [],
  exports: [PhonesService],
  providers: [
    PhonesService
  ],
})

export class PhonesModule {}
