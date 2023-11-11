import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from "typeorm";
import { Line } from "./lines.entity";
import { User } from "src/users/infraestructure/users.entity";

@Entity()
export class Phone {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: number;

  @ManyToOne(() => Line, (linePhone) => linePhone.phones) 
  linePhone: Line;

  @OneToOne(() => User, (user) => user.phones)
  user: User;
} 