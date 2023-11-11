//Decoradores
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, Check, ManyToOne } from "typeorm";
import { User } from "../../users/infraestructure/users.entity";

@Entity()
export class StoredEdition {
  
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  editionDate: Date;

  @Column()
  @Check(`fields IN ('email', 'name', 'birth_date', 'genders', 'phones')`)
  fields: string;

  @Column()
  oldValue: number;

  @Column()
  newValue: number;

  @ManyToOne(() =>User, (user) => user.edition) //Se hace el cambio en la tabla de reportes por este decorador
  user: User;


}