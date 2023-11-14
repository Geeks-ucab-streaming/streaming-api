import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PhoneDto } from "../dtos/phone.dto";
import { CreatePhoneDto } from '../dtos/create-phone.dto';


@Injectable()
export class PhonesService {

  //InjectRepository(): Le decimos al sistema de DI que necesitamos usar el reporistorio de "Teléfono".
  //DI usa esta notación (Repository<Phone>) para averiguar cuál instancia necesita "inyectar" a esta clase en tiempo de ejecución.
  //Se usa el decorador porque Repository<PhoneDto> tiene un parámetro genérico
  constructor(@InjectRepository(PhoneDto) private repo: Repository<PhoneDto>){}

  create(phones : CreatePhoneDto){
    const phone = this.repo.create(phones); //Crea la intancia del teléfono
    return this.repo.save(phone); //Guarda la instancia en la BD.
  }

  findOne(phoneNumber: number) {
    const phone = this.repo.findOneBy({phoneNumber});
    if (!phoneNumber){
      console.log("Manejar el Optional aquí para indicar el error. No se encontró teléfono");
    }
    return phone;
  }

}

