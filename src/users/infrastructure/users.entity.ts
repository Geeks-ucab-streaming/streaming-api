//Decoradores
import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  Check,
  JoinColumn,
} from 'typeorm';
import { PhoneEntity } from '../../phones/infrastructure/phones.entity';
import { StoredEdition } from './storedEdition.entity';
import { ReproducedSong } from 'src/common/infrastructure/entities/ReproducedSong.entity';

@Entity('Users')
export class UserEntity  {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'date', nullable: true })
  birth_date: Date;

  @Column({ type: 'text', nullable: true })
  @Check(`suscriptionState IN ('gratuito', 'premium' ,'vencido' ,'eliminado')`)
  suscriptionState: string;

  @Column({ type: 'text', nullable: true })
  @Check(`gender IN ('M', 'F')`)
  gender: string;

  @OneToOne(() => PhoneEntity, (phone) => phone.user)
  @JoinColumn()
  phone: PhoneEntity;

  @OneToMany(() => StoredEdition, (edition) => edition)
  edition: StoredEdition[];

  @OneToMany(() => ReproducedSong, (reproducedSong) => reproducedSong.user)
  reproducedSong: ReproducedSong[];

  //Decoradores Hooks. [Para que se ejecuten, debes crear(instanciar la entidad) y salvar]
  @AfterInsert()
  logInsert() {
    //Se ejecutará este método cuando hagas algo al usuario (Insert, Update, Delete)
    console.log('Inerted User with id ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Update User whit id ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Remove User whit id ', this.id);
  }
}
