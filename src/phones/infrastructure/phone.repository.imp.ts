import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneEntity } from './phones.entity';
import { ICreateRepository } from 'src/phones/domain/generic-repo-phones';
import { Phone } from '../domain/phone';

export class PhoneRepository implements ICreateRepository<Phone> {
  constructor(
    @InjectRepository(PhoneEntity)
    private readonly repository: Repository<PhoneEntity>,
  ) {}
  findById(id: string): Promise<Phone> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Phone[]> {
    return this.repository.find();
  }
  create(phone: Phone): Promise<Phone> {
    return this.repository.save(phone);
  }
}
