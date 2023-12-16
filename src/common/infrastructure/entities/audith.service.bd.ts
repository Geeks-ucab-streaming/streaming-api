import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";


@Entity('Audith')
export class Audith{
  
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'json', nullable: false }) 
  origin: JSON;
  
  }

