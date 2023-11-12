//Decoradores
import { AfterInsert, AfterUpdate, AfterRemove, Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, Check } from "typeorm";
import { Phone } from "../../phones/infrastructure/phones.entity";
import { StoredEdition } from "./storedEdition.entity";
import { IsOptional } from "class-validator";

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @Column()
  name: string;

  @IsOptional()
  @Column()
  birth_date: Date;

  @IsOptional() 
  @Column()
  @Check(`genders IN ('M', 'F')`)
  genders: string;

  @OneToOne(() => Phone, (phones) => phones.user)
  phones: Phone;

  @OneToMany(() => StoredEdition, (edition) => edition)
  edition: StoredEdition[];

  //Decoradores Hooks. [Para que se ejecuten, debes crear(instanciar la entidad) y salvar]
  @AfterInsert()
  logInsert(){
    //Se ejecutará este método cuando hagas algo al usuario (Insert, Update, Delete)
    console.log("Inerted User with id ", this.id);
  }

  @AfterUpdate()
  logUpdate(){
    console.log("Update User whit id ", this.id);
  }

  @AfterRemove()
  logRemove(){
    console.log("Remove User whit id ", this.id);
  }
}