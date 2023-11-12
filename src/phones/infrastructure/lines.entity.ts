import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Phone } from "./phones.entity";
import { Prefixes } from "./prefixes.entity";

@Entity()
export class Line {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Phone, (phones) => phones) 
  phones: Phone[];

  @OneToMany(() => Prefixes, (prefixes) => prefixes) 
  prefixes: Prefixes[];

} 

