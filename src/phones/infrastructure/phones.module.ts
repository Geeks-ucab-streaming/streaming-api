import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from '../../phones/infrastructure/entities/phones.entity';
import { PhonesService } from '../application/services/phones.service';
import { UsersModule } from '../../users/infrastructure/users.module';
import { PhoneRepository } from './phone.repository.imp';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneEntity])],
  controllers: [],
  exports: [PhonesService, PhoneRepository],
  providers: [
    PhonesService,
    {
      provide: 'ICreateRepository',
      useClass: PhoneRepository,
    },
  ],
})
export class PhonesModule {}
